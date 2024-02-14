const db = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getOne = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM users", "");
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const queryStr = "SELECT * FROM users WHERE users.email=$1;";
        const queryValues = [email];
        const response = await db.query(queryStr, queryValues);
        if (response.rows[0]){
            //Check if password is the same
            const check = await bcrypt.compare(password, response.rows[0].password);
            if (!check) {
                res.status(401).json({ msg: "wrong password" });
                return;
            }
            const userObj = response.rows[0];
            const token = createJWT(userObj);
            userObj.token = token;
            res.status(201).json(userObj);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedPassword = await hashPassword(password);
        const queryStr = "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) returning user_id;";
        const queryValues = [name, email, updatedPassword];
        const response = await db.query(queryStr, queryValues);
        if (response?.rows[0]?.user_id){
            const queryUserStr = "SELECT * FROM users WHERE users.user_id = $1;";
            const queryUserValues = [response.rows[0].user_id];
            const user = await db.query(queryUserStr, queryUserValues);
            console.log(user);
            if (user.rows[0]){
                const userObj = user.rows[0];
                const token = createJWT(userObj);
                userObj.token = token;
                res.status(201).json(userObj);
            } 
        } else{
            res.status(500).json({ message: "Error adding User" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: "24h" }
    );
}

async function hashPassword(password){
    const SALT_ROUNDS = 10;
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return hashed;
}

module.exports = {
    getOne, 
    login,
    signup,
};
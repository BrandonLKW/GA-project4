const db = require("../db/index");

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
        const queryStr = "SELECT * FROM users WHERE users.email=$1 AND users.password=$2";
        const queryValues = [email, password];
        const response = await db.query(queryStr, queryValues);
        if (response.rows[0]){
            res.status(201).json(response.rows[0]);
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
        const queryStr = "INSERT INTO users(name, email, password) VALUES ($1, $2, $3) returning id;";
        const queryValues = [name, email, password];
        const response = await db.query(queryStr, queryValues);
        if (response?.rows[0]?.id){
            const queryUserStr = "SELECT * FROM users WHERE users.id = $1";
            const queryUserValues = [response.rows[0].id];
            const user = await db.query(queryUserStr, queryUserValues);
            if (user.rows[0]){
                res.status(201).json(user.rows[0]);
            } 
        } else{
            res.status(500).json({ message: "Error adding User" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getOne, 
    login,
    signup,
};
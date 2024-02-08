const db = require("../db/index");

const getOne = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM usertable", "");
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getOne, 
};
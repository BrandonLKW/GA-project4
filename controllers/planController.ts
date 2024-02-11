const plandb = require("../db/index");

const getAllExercises = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM exercises"
        const response = await plandb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllExerciseGroups = async (req, res) => {
    try {
        const queryStr = "SELECT DISTINCT muscle_group FROM exercises ORDER BY muscle_group"
        const response = await plandb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllExerciseByFilter = async (req, res) => {
    try {
        const { muscle_group, name} = req.body;
        let queryStr = "SELECT DISTINCT * FROM exercises ";
        const queryValues : string[] = [];
        if (muscle_group){
            queryStr += "WHERE exercises.muscle_group=$1 ";
            queryValues.push(muscle_group);
        }
        if (name){
            if (queryValues.length === 0){
                queryStr += "WHERE exercises.muscle_group LIKE %$1% ";
            } else{
                queryStr += "AND exercises.muscle_group LIKE %$2% ";
            }
            queryValues.push(name);
        }
        queryStr += "ORDER BY exercises.muscle_group, exercises.name ";
        const response = await plandb.query(queryStr, queryValues);
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}


module.exports = {
    getAllExercises,
    getAllExerciseGroups,
    getAllExerciseByFilter,
};
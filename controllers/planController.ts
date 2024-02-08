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

const getExerciseByMuscleGroup = async (req, res) => {
    try {
        const { muscle_group } = req.body; 
        const queryStr = "SELECT * FROM exercises WHERE exercises.muscle_group=$1";
        const queryValues = [muscle_group];
        const response = await plandb.query(queryStr, queryValues);
        if (response.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllExercises,
    getExerciseByMuscleGroup,
};
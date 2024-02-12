const plandb = require("../db/index");

const getAllTemplatePlans = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM plans WHERE plans.is_template = TRUE";
        const response = await plandb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllUserPlans = async (req, res) => {
    try {
        const { user_id } = req.body;
        let queryStr = `SELECT * FROM plans WHERE plans.user_id = ${user_id}`;
        const response = await plandb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const addUserPlan = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        const queryStr = "INSERT INTO plans(name, is_template, user_id) VALUES ($1, FALSE, $2) returning plan_id;";
        const queryValues = [name, user_id];
        const response = await plandb.query(queryStr, queryValues);
        if (response?.rows[0]){
            res.status(201).json(response.rows[0]);
        } else{
            res.status(500).json({ message: "Error adding Plan" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getRoutinesByPlan = async (req, res) => {
    try {
        const { plan_id } = req.body;
        let queryStr = `SELECT * FROM routines WHERE routines.plan_id = ${plan_id}`;
        const response = await plandb.query(queryStr, "");
        res.status(201).json(response.rows);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getAllExercises = async (req, res) => {
    try {
        const queryStr = "SELECT * FROM exercises";
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

const getExerciseById = async (req, res) => {
    try {
        const { exercise_id } = req.body;
        const queryStr = `SELECT * FROM exercises WHERE exercises.exercise_id = ${exercise_id}`;
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
    getAllTemplatePlans, 
    getAllUserPlans, 
    addUserPlan,
    getRoutinesByPlan,
    getAllExercises,
    getAllExerciseGroups,
    getExerciseById,
    getAllExerciseByFilter,
};
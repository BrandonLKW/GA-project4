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

const addUserRoutine = async (req, res) => {
    try {
        console.log(req.body);
        const { seq, reps, duration, weight, plan_id, exercise_id } = req.body;
        const queryStr = "INSERT INTO routines(seq, reps, duration, weight, plan_id, exercise_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING routine_id;";
        const queryValues = [seq, reps, duration, weight, plan_id, exercise_id];
        const response = await plandb.query(queryStr, queryValues);
        if (response?.rows[0]){
            res.status(201).json(response.rows[0]);
        } else{
            res.status(500).json({ message: "Error adding Routine" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateUserRoutine = async (req, res) => {
    try {
        const { seq, reps, duration, weight, routine_id } = req.body;
        const queryStr = "UPDATE routines SET seq = $1, reps = $2, duration = $3, weight = $4 WHERE routine_id = $5 RETURNING routine_id;";
        const queryValues = [seq, reps, duration, weight, routine_id];
        const response = await plandb.query(queryStr, queryValues);
        if (response?.rows[0]){
            res.status(201).json(response.rows[0]);
        } else{
            res.status(500).json({ message: "Error Updating Routine" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteUserRoutine = async (req, res) => {
    try {
        const { routine_id } = req.body;
        const queryStr = "DELETE FROM routine WHERE routine_id = $1 RETURNING routine_id";
        const queryValues = [routine_id];
        const response = await plandb.query(queryStr, queryValues);
        if (response?.rows[0]){
            res.status(201).json(response.rows[0]);
        } else{
            res.status(500).json({ message: "Error Updating Routine" });
        }
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

const addExercise = async (req, res) => {
    try {
        const { name, muscle_group, description } = req.body;
        const queryStr = "INSERT INTO exercises(name, muscle_group, description) VALUES ($1, $2, $3) RETURNING exercise_id; ";
        const queryValues = [name, muscle_group, description];
        const response = await plandb.query(queryStr, queryValues);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateExercise = async (req, res) => {
    try {
        const { name, muscle_group, description, exercise_id } = req.body;
        const queryStr = "UPDATE exercises SET name = $1, muscle_group = $2, description = $3 WHERE exercise_id = $4 RETURNING exercise_id";
        const queryValues = [name, muscle_group, description, exercise_id];
        const response = await plandb.query(queryStr, queryValues);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteExercise = async (req, res) => {
    try {
        const { exercise_id } = req.body;
        const queryStr = "DELETE FROM exercises WHERE exercise_id = $1 ";
        const queryValues = [exercise_id];
        const response = await plandb.query(queryStr, queryValues);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
}


module.exports = {
    getAllTemplatePlans, 
    getAllUserPlans, 
    addUserPlan, 
    getRoutinesByPlan, 
    addUserRoutine, 
    updateUserRoutine, 
    deleteUserRoutine, 
    getAllExercises, 
    getAllExerciseGroups, 
    getExerciseById, 
    getAllExerciseByFilter,
    addExercise, 
    updateExercise, 
    deleteExercise
};
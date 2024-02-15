const workoutdb = require("../db/index");

const getWorkoutsByDateRange = async (req, res) => {
    try {
        const { user_id, startdate, enddate } = req.body; 
        let queryStr = "SELECT * FROM workouts WHERE workouts.user_id = $1 ";
        queryStr += "AND workouts.workout_date >= $2 ";
        queryStr += "AND workouts.workout_date <= $3 ";
        const queryValues = [user_id, startdate, enddate];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getWorkoutRoutinesByWorkout = async (req, res) => {
    try {
        const { workout_id } = req.body;
        const queryStr = "SELECT * FROM workout_routines INNER JOIN exercises ON exercises.exercise_id = workout_routines.exercise_id WHERE workout_routines.workout_id = $1";
        const queryValues = [workout_id];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getBmiDataByFilters = async (req, res) => {
    try {
        const { startdate, enddate, user_id } = req.body;
        let queryStr = "SELECT day, COALESCE(average_weight, 0) FROM generate_series($1::date, $2::date, '1 day'::interval) AS day ";
        queryStr += "LEFT JOIN (SELECT workout_date, AVG(body_weight)::numeric(10,2) as average_weight FROM workouts ";
        queryStr += "WHERE workout_date >= $1 AND workout_date <= $2 AND user_id = $3 ";
        queryStr += "GROUP BY workout_date) workout on workout.workout_date = day ";
        const queryValues = [startdate, enddate, user_id];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getExerciseDataByFilters = async (req, res) => {
    try {
        const { startdate, enddate, user_id, exercise_id } = req.body;
        let queryStr = "SELECT workouts.workout_date, workout_routines.weight, SUM(workout_routines.reps) AS rep_sum FROM workout_routines ";
        queryStr += "INNER JOIN workouts ON workouts.workout_id = workout_routines.workout_id ";
        queryStr += "WHERE workout_routines.workout_id IN ( ";
        queryStr += "SELECT workout_id FROM workouts ";
        queryStr += "WHERE workout_date >= $1 ";
        queryStr += "AND workout_date <= $2 ";
        queryStr += "AND user_id = $3 ";
        queryStr += ") AND workout_routines.exercise_id = $4 ";
        queryStr += "GROUP BY workouts.workout_date, workout_routines.weight";
        const queryValues = [startdate, enddate, user_id, exercise_id];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getDurationDataByFilters = async (req, res) => {
    try {
        const { startdate, enddate, user_id } = req.body;
        let queryStr = "SELECT day, COALESCE(average_duration, 0) FROM generate_series($1::date, $2::date, '1 day'::interval) AS day ";
        queryStr += "LEFT JOIN (SELECT workouts.workout_date, AVG(workout_routines.duration)::numeric(10,2) as average_duration FROM workout_routines ";
        queryStr += "INNER JOIN workouts ON workouts.workout_id = workout_routines.workout_id ";
        queryStr += "WHERE workout_routines.workout_id IN ( ";
        queryStr += "SELECT workout_id FROM workouts WHERE workout_date >= $1 AND workout_date <= $2 AND user_id = $3 )";
        queryStr += "GROUP BY workouts.workout_date) eva ON eva.workout_date = day ";
        const queryValues = [startdate, enddate, user_id];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows){
            res.status(201).json(response.rows);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const addWorkouts = async (req, res) => {
    try {
        for (const workout of req.body){
            const queryStr = "INSERT INTO workouts(workout_date, body_weight, status, notes, plan_name, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING workout_id;";
            const queryValues = [workout.workout_date_str, workout.body_weight, workout.status, workout.notes, workout.plan_name, workout.user_id];
            const response = await workoutdb.query(queryStr, queryValues);
            if (response?.rows[0]){
                const newWorkoutId = response?.rows[0].workout_id;
                let routineResponse = null;
                for (const routine of workout.routineList){
                    const routineQueryStr = "INSERT INTO workout_routines(seq, reps, duration, weight, exercise_id, workout_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING wr_id";
                    const routineQueryValues = [routine.seq, routine.reps, routine.duration, routine.weight, routine.exercise_id, newWorkoutId];
                    routineResponse = await workoutdb.query(routineQueryStr, routineQueryValues);
                }
                if (response?.rows[0]){
                    res.status(201).json({"status": "completed"});
                } 
            } else{
                throw "Error adding Workout";
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateWorkout = async (req, res) => {
    try {
        const { body_weight, status, workout_id } = req.body;
        const queryStr = "UPDATE workouts SET body_weight = $1, status = $2 WHERE workout_id = $3 RETURNING workout_id";
        const queryValues = [body_weight, status, workout_id];
        const response = await workoutdb.query(queryStr, queryValues);
        if (response?.rows[0]){
            res.status(201).json(response.rows[0]);
        } else{
            res.status(500).json({ message: "No Rows found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getWorkoutsByDateRange,
    getWorkoutRoutinesByWorkout,
    getBmiDataByFilters,
    getExerciseDataByFilters,
    getDurationDataByFilters,
    addWorkouts,
    updateWorkout,
};

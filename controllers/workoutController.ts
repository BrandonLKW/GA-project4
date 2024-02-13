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

const addWorkouts = async (req, res) => {
    try {
        for (const workout of req.body){
            const queryStr = "INSERT INTO workouts(workout_date, body_weight, status, notes, plan_name, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING workout_id;";
            const queryValues = [workout.workout_date, workout.body_weight, workout.status, workout.notes, workout.plan_name, workout.user_id];
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
                    res.json({"status": "completed"});
                } else{
                    throw "Error adding WorkoutRoutines";
                }
            } else{
                throw "Error adding Workout";
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getWorkoutsByDateRange,
    addWorkouts,
};

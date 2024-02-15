const workoutExpress = require("express");
const workoutRouter = workoutExpress.Router();
const workoutController = require("../controllers/workoutController");

workoutRouter.post("/date", workoutController.getWorkoutsByDateRange);
workoutRouter.post("/routine", workoutController.getWorkoutRoutinesByWorkout);
workoutRouter.post("/filter/bmi", workoutController.getBmiDataByFilters);
workoutRouter.post("/filter/exercise", workoutController.getExerciseDataByFilters);
workoutRouter.post("/filter/duration", workoutController.getDurationDataByFilters);
workoutRouter.post("/add", workoutController.addWorkouts);
workoutRouter.post("/update", workoutController.updateWorkout);

module.exports = workoutRouter;
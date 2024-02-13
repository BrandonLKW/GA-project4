const workoutExpress = require("express");
const workoutRouter = workoutExpress.Router();
const workoutController = require("../controllers/workoutController");

workoutRouter.post("/date", workoutController.getWorkoutsByDateRange);
workoutRouter.post("/add", workoutController.addWorkouts);

module.exports = workoutRouter;
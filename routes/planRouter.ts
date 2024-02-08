const planExpress = require("express");
const planRouter = planExpress.Router();
const planController = require("../controllers/planController");

planRouter.get("/exercises", planController.getAllExercises);
planRouter.post("/exercises/muscle", planController.getExerciseByMuscleGroup);

module.exports = planRouter;
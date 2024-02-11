const planExpress = require("express");
const planRouter = planExpress.Router();
const planController = require("../controllers/planController");

planRouter.get("/exercises", planController.getAllExercises);
planRouter.get("/exercises/groups", planController.getAllExerciseGroups);
planRouter.post("/exercises/search", planController.getAllExerciseByFilter);

module.exports = planRouter;
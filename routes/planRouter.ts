const planExpress = require("express");
const planRouter = planExpress.Router();
const planController = require("../controllers/planController");

//plans
planRouter.get("/template", planController.getAllTemplatePlans);
planRouter.post("/user", planController.getAllUserPlans);
planRouter.post("/user/add", planController.addUserPlan);

//routines
planRouter.post("/routines", planController.getRoutinesByPlan);

//Exercises
planRouter.get("/exercises", planController.getAllExercises);
planRouter.get("/exercises/groups", planController.getAllExerciseGroups);
planRouter.post("/exercises/id", planController.getExerciseById);
planRouter.post("/exercises/search", planController.getAllExerciseByFilter);

module.exports = planRouter;
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const path = require("path");
const userRouter = require("./routes/userRouter");
const planRouter = require("./routes/planRouter");
const workoutRouter = require("./routes/workoutRouter");

const server: Express = express();

//middleware block
server.use(express.json());
server.use(express.static(path.join(__dirname, "dist")));

//routes block
server.get("/test", (_req: Request, res: Response) => {
    res.json({ hello: "world" });  
});
server.use("/api/user", userRouter);
server.use("/api/plan", planRouter);
server.use("/api/workout", workoutRouter);

//listen block
const port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});

//https://blog.logrocket.com/how-to-set-up-node-typescript-express/
//https://www.split.io/blog/express-typescript-guide/
//https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension
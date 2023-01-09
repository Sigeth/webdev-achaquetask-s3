const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
const { getTasks, deleteTaskByID, insertNewTask, updateTaskByID } = require("./taskController.js");
const { registerUser, findUser } = require("./userController.js");
const cors = require("cors");

app.use(cors({credentials: true, origin: "http://localhost:4200"}))
app.use(express.json());
app.use(express.static(__dirname + '/website'));
app.use(session({
    secret: "secretStringIGuess",
    name: "cookieTaskApp"
}));

function checkSignedIn(req, res, next) {
    req.session.user
        ? next()
        : res.status(401).json({message: "Unauthorized"});
}

/*
##########################################
############ TASK ENDPOINTS ##############
##########################################
*/

app.get("/api/tasks", checkSignedIn, async (req, res, next) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.delete("/api/task/:id", async (req, res, next) => {
    try {
        const statusMsg = await deleteTaskByID(req.params.id);
        res.status(200).json({message: "Task deleted", status: statusMsg});
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.post("/api/task", async (req, res, next) => {
    try {
        const task = {
            title: req.body.title,
            finished: req.body.finished,
            status: req.body.status
        };
        await insertNewTask(task);

        res.status(200).json(task);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.put("/api/task/:id", async (req, res, next) => {
    try {
        let statusMsgs = []
        for (const key of Object.keys(req.body)) {
            if (key === "_id") continue;
            statusMsgs.push(await updateTaskByID(req.params.id, key, req.body[key]));
        }
        res.status(200).json({message: "Task updated", status: statusMsgs});
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

/*
##########################################
########### USERS ENDPOINTS ##############
##########################################
*/

app.post("/api/register", async (req, res, next) => {
    try {
        const user = {
            login: req.body.login,
            password: req.body.password
        };
        const statusMsg = await registerUser(user);

        res.status(200).json({message: "User registered", "user": user, status: statusMsg});
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.post("/api/login", async (req, res, next) => {
    try {
        const user = {
            login: req.body.login,
            password: req.body.password
        };
        const foundUsers = await findUser(user);
        if(foundUsers.length === 1) {
            req.session.user = req.body.login;
            res.status(200).end();
        } else {
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.post("/api/logout", async (req, res, next) => {
    try {
        if (req.session) {
            await req.session.destroy();
        }
        res.status(200).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.get("/api/isConnected", checkSignedIn, (req, res, next) => {
    res.status(200).end();
});

/*
##########################################
############## LAUNCH APP ################
##########################################
*/

app.listen(port, () => {
    console.log(`app launched on port ${port}`);
});


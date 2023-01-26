const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
const { getTasks, deleteTaskByID, insertNewTask, updateTaskByID } = require("./taskController.js");
const { getLists, deleteListByID, addList, updateListByID } = require("./listController");
const { registerUser, findUser, checkUser } = require("./userController.js");
const cors = require("cors");
const { ObjectId } = require("mongodb");

app.use(cors({credentials: true, origin: "http://localhost:4200"}))
app.use(express.json());
app.use(session({
    secret: "secretStringIGuess",
    name: "cookieTaskApp"
}));

function checkSignedIn(req, res, next) {
    
    req.session.user
        ? next()
        : res.status(401).json({message: "Unauthorized"});
    console.log(req.session);
}

/*
##########################################
############ TASK ENDPOINTS ##############
##########################################
*/

app.get("/api/tasks", checkSignedIn, async (req, res, next) => {
    try {
        const tasks = await getTasks(req.query.listId,req.session.user);
        res.status(200).json(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.delete("/api/task/:id", checkSignedIn, async (req, res, next) => {
    try {
        const statusMsg = await deleteTaskByID(req.params.id);
        res.status(200).json({message: "Task deleted", status: statusMsg});
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.post("/api/task", checkSignedIn, async (req, res, next) => {
    try {
        const task = {
            title: req.body.title,
            finished: req.body.finished,
            status: req.body.status,
            listId: req.body.listId ? new ObjectId(req.body.listId) : undefined,
            user: req.session.user
        };
        await insertNewTask(task);

        res.status(200).json(task);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.put("/api/task/:id", checkSignedIn, async (req, res, next) => {
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
############ LIST ENDPOINTS ##############
##########################################
*/

app.get("/api/lists", checkSignedIn, async (req, res, next) => {
    try {
        const lists = await getLists(req.session.user);
        res.status(200).json(lists);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.delete("/api/list/:id", checkSignedIn, async (req, res, next) => {
    try {
        const statusMsg = await deleteListByID(req.params.id);
        res.status(200).json({message: "List deleted", status: statusMsg});
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.post("/api/list", checkSignedIn, async (req, res, next) => {
    try {
        const list = {
            title: req.body.title,
            user:req.session.user
        };
        await addList(list);

        res.status(200).json(list);
    } catch (e) {
        console.error(e);
        res.status(500).json({code: 500, error: e.toString()});
    }
});

app.put("/api/list/:id", checkSignedIn, async (req, res, next) => {
    try {
        let statusMsgs = []
        for (const key of Object.keys(req.body)) {
            if (key === "_id") continue;
            statusMsgs.push(await updateListByID(req.params.id, key, req.body[key]));
        }
        res.status(200).json({message: "List updated", status: statusMsgs});
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
        const chechUser = await checkUser(req.body.login);   
        if(chechUser.length === 1) {
            res.status(403).json({message: "Login already used"});
            res.status(200).end()
        } else { 
            const statusMsg = await registerUser(user);
            res.status(200).json({message: "User registered", "user": user, status: statusMsg});
            res.status(200).end(); 
        }
        
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



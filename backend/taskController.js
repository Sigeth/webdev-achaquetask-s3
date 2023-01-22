const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017";

module.exports = {
    async getTasks(listId) {
        const db = await MongoClient.connect(dbUrl)
        const dbo = db.db("tasks");

        return await dbo.collection("tasks").find({listId: listId ? new ObjectId(listId) : undefined}).toArray();
    },
    async insertNewTask(task) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        return await dbo.collection("tasks").insertOne(task);
    },
    async deleteTaskByID(id) {
        const db = await MongoClient.connect(dbUrl)
        const dbo = db.db("tasks");
        return await dbo.collection("tasks").deleteOne({_id: new ObjectId(id)});
    },
    async updateTaskByID(id, key, newValue) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        let toChange = {};
        if (key === "listId") {
            newValue = new ObjectId(newValue);
        }
        toChange[key] = newValue;
        return await dbo.collection("tasks").updateOne({_id: new ObjectId(id)}, {$set: toChange});
    }
}
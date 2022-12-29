const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017";

module.exports = {
    async getTasks(filter) {
        const db = await MongoClient.connect(dbUrl)
        const dbo = db.db("tasks");

        let effectiveFilter;
        switch(filter) {
            case 'all':
                effectiveFilter = {};
                break;
            case 'todo':
                effectiveFilter = { finished: false };
                break;
            case 'finished':
                effectiveFilter = { finished: true };
                break;
            default:
                effectiveFilter = {};
                break;
        }

        return await dbo.collection("tasks").find(effectiveFilter).toArray();
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
        toChange[key] = newValue;
        return await dbo.collection("tasks").updateOne({_id: new ObjectId(id)}, {$set: toChange});
    }
}
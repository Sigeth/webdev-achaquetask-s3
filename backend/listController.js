const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017";

module.exports = {
    async getLists(user) {
        const db = await MongoClient.connect(dbUrl)
        const dbo = db.db("tasks");

        return await dbo.collection("lists").find({user:user}).toArray();
    },
    async addList(list) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        return await dbo.collection("lists").insertOne(list);
    },
    async deleteListByID(id) {
        const db = await MongoClient.connect(dbUrl)
        const dbo = db.db("tasks");
        await dbo.collection("tasks").deleteMany({listId: new ObjectId(id)});
        return await dbo.collection("lists").deleteOne({_id: new ObjectId(id)});
    },
    async updateListByID(id, key, newValue) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        let toChange = {};
        toChange[key] = newValue;
        return await dbo.collection("lists").updateOne({_id: new ObjectId(id)}, {$set: toChange});
    }
}

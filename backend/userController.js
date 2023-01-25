const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017";

module.exports = {
    async registerUser(user) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        return await dbo.collection("users").insertOne(user);
    },

    async findUser(user) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        return await dbo.collection("users").find({login: user.login, password: user.password}).toArray();
    },

    async checkUser(user) {
        const db = await MongoClient.connect(dbUrl);
        const dbo = db.db("tasks");
        return await dbo.collection("users").find({login: user}).toArray();
    }
}
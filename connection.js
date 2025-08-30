const mongoose = require("mongoose");

//connection

async function connectMongoDb(url) {
    return mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("mongodb err", err));
}

module.exports = {
    connectMongoDb
}

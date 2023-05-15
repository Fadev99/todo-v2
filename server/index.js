import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todos from "./routers/todos.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
const URI =
    "mongodb+srv://root:root@cluster0.ugerpht.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to mongodb");
        app.listen(port, () => {
            console.log(`Express server listening on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

app.use("/todos", todos);

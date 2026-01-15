import express from "express";
import cors from "cors";
import dbConnection from "./db/dbConnection";
import Task from "./model/task.model";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

dbConnection();


app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (err) {
        res.json("failed to get the tasks")
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.json("title is required")
        }
        const newTask = await Task.create({ title });
        res.json(newTask);
    } catch (err) {
        res.json("failed to create a task");
    }
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updateTask = await Task.findByIdAndUpdate(id, { title, completed }, { new: true });

        if (!updateTask) {
            return res.json("task not found");
        }

        res.json(updateTask);

    } catch (err) {
        res.json("failed to update the task");
    }
})

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
             return res.json("task not found");
        }
        res.json(deleteTask);
    } catch (err) {
        res.json("failed to delete task")
    }
})

app.listen(port, () => {
    console.log(`app is running on the port ${port}`);
})
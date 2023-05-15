import { Task } from "../models/task.js";

export const lists = async (req, res) => {
    try {
        const tasks = await Task.find({
            isDeleted: false
        }).sort({ createdAt : -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const task = new Task(body);
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const update = async (req, res) => {
    try {
        const body = req.body;
        const task = await Task.findByIdAndUpdate({ _id: body._id }, body, {
            new: true,
        });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const remove = async (req, res) => {
    try {
        const body = req.body;
        const task = await Task.findOneAndDelete({ _id: body._id });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const find = async (req, res) => {
    try {
        const body = req.body;
        const task = await Task.findById({_id: body._id});

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error });
    }
}

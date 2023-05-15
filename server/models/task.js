import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        nameTask: {
            type: String,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        dueDate: {
            type: Date,
            require: true,
        },
        priority: {
            type: String,
            require: true,
        },
        done: {
            type: Boolean,
            require: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Tasks", schema);

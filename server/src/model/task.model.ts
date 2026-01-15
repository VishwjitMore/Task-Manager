import mongoose, { Schema, Document } from "mongoose";

export interface TaskDocument extends Document {
    title: string,
    completed: boolean,
}

const TaskSchema = new Schema<TaskDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task",TaskSchema);

export default Task;

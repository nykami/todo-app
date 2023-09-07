import { Types, Schema, model, Model, Document } from 'mongoose';

enum TodoPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface ITodo extends Document {
  title: string;
  description: string;
  priority: string;
  date: Date;
  isChecked: boolean;
  isEditing: boolean
  userId: Types.ObjectId;
}

const todoSchema: Schema = new Schema({
  title: { type: String, default: 'Title' },
  description: { type: String, default: 'Description' },
  priority: {
    type: String,
    enum: Object.values(TodoPriority),
    default: TodoPriority.Medium,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  isChecked: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const todoModel: Model<ITodo> = model<ITodo>('Todo', todoSchema);

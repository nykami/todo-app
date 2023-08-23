import { Types, Schema, model, Model } from 'mongoose';

enum TodoPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

interface ITodo extends Document {
  title: string;
  description: string;
  priority: string;
  date: string;
  isChecked: boolean;
  user: Types.ObjectId;
}

const todoSchema: Schema = new Schema({
  title: { type: String, default: 'Title', required: true },
  description: { type: String, default: 'Description', required: true },
  priority: {
    type: String,
    required: true,
    enum: Object.values(TodoPriority),
    default: TodoPriority.Medium,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString('en-GB'),
    required: true,
  },
  isChecked: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  user: { type: Types.ObjectId, ref: 'User', required: true },
});

export const todoModel: Model<ITodo> = model<ITodo>('Todo', todoSchema);

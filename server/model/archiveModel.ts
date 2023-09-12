import { Types, Schema, model, Model, Document } from 'mongoose';

export interface IArchive extends Document {
  title: string;
  description: string;
  priority: string;
  date: Date;
  isChecked: boolean;
  todoId: Types.ObjectId;
  userId: Types.ObjectId;
}

const archiveSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isChecked: { type: Boolean, default: false },
  todoId: { type: Types.ObjectId, ref: 'Todo', required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const archiveModel: Model<IArchive> = model<IArchive>(
  'Archive',
  archiveSchema
);

import { todoModel } from '../model/todoModel';

export const createTodo = (values: Record<string, any>) => {
  return new todoModel(values).save();
};

export const getTodos = (userId: string) => todoModel.find({ userId: userId });

export const getTodoById = (id: string) => todoModel.findById(id);

export const deleteTodoById = async (id: string) => {
  const deletedTodo = await todoModel.findByIdAndDelete(id).exec();
  return deletedTodo;
};
export const updateTodoById = (id: string, values: Record<string, any>) =>
  todoModel.findByIdAndUpdate(id, values);

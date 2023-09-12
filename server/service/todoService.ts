import { archiveModel } from '../model/archiveModel';
import { todoModel } from '../model/todoModel';

class TodoService {
  async createTodo(values: Record<string, any>) {
    return new todoModel(values).save();
  }

  async getTodos(userId: string) {
    return todoModel.find({ userId: userId });
  }

  async getTodoById(id: string) {
    return todoModel.findById(id);
  }

  async deleteTodoById(id: string) {
    return todoModel.findByIdAndDelete(id, { new: true });
  }

  async updateTodoById(id: string, values: Record<string, any>) {
    return todoModel.findByIdAndUpdate(id, values, { new: true });
  }

  async createArchive(values: Record<string, any>) {
    return new archiveModel(values).save();
  }

  async getFilteredTodos(userId: string, searchInput: string) {
    return todoModel
      .find({
        userId: userId,
        $or: [
          { title: { $regex: searchInput, $options: 'i' } },
          { description: { $regex: searchInput, $options: 'i' } },
        ],
      })
      .exec();
  }
}

export default new TodoService();

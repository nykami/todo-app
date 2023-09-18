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

  async deleteTodoById(id: string, userId: string) {
    return todoModel.findOneAndDelete(
      { _id: id, userId: userId },
      { new: true }
    );
  }

  async updateTodoById(
    id: string,
    userId: string,
    values: Record<string, any>
  ) {
    return todoModel.findOneAndUpdate({ _id: id, userId: userId }, values, {
      new: true,
    });
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

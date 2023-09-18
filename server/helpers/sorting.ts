import { ITodo } from '../model/todoModel';

class Sorting {
  sortByTitle = (todos: ITodo[], order: string) => {
    return todos.sort((a: ITodo, b: ITodo) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return this.compareComponents(titleA, titleB, order);
    });
  };

  sortByDescription = (todos: ITodo[], order: string) => {
    return todos.sort((a: ITodo, b: ITodo) => {
      const descA = a.description.toLowerCase();
      const descB = b.description.toLowerCase();
      return this.compareComponents(descA, descB, order);
    });
  };

  compareComponents = (
    componentA: string,
    componentB: string,
    order: string
  ) => {
    return order === 'desc'
      ? componentB.localeCompare(componentA)
      : componentA.localeCompare(componentB);
  };

  sortByDate = (todos: ITodo[], order: string) => {
    
    return todos.sort((a: ITodo, b: ITodo) => {
      const dateA = a.date.toLocaleDateString().slice(0, 14);
      const dateB = b.date.toLocaleDateString().slice(0, 14);
      
      const [dayA, monthA, yearA] = dateA.split('. ');
      const [dayB, monthB, yearB] = dateB.split('. ');

      const yearComparison = this.compareComponents(yearA, yearB, order);
      if (yearComparison !== 0) {
        return yearComparison;
      }

      const monthComparison = this.compareComponents(monthA, monthB, order);
      if (monthComparison !== 0) {
        return monthComparison;
      }

      return this.compareComponents(dayA, dayB, order);
    });
  };

  sortByPriority = (todos: ITodo[], order: string) => {
    const priorityValues: Record<string, number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return todos.sort((a: ITodo, b: ITodo) => {
      const priorityA = priorityValues[a.priority];
      const priorityB = priorityValues[b.priority];
      return order === 'desc' ? priorityB - priorityA : priorityA - priorityB;
    });
  };
}

export default new Sorting();

const TodoList = require('./todolist.js');

class User {
  constructor(name) {
    this.userName = name;
    this.todos = {};
  }
  get name(){
    return this.userName;
  }
  get allTodos(){
    let todos = [];
    Object.keys(this.todos).forEach((todoID)=>{
      todos.push(this.todos[todoID]);
    });
    return todos;
  };
  get noOfTodos(){
    return this.allTodos.length;
  }
  getTodo(todoId){
    return this.todos[todoId];
  }
  addTodo(title,desc){
    let todoID = `todo${this.noOfTodos + 1}`;
    this.todos[todoID] = new TodoList(todoID,title,desc);
  }
  addTodoItem(todoID,title,desc){
    let todo = this.getTodo(todoID);
    todo.addItem(title,desc);
  }
  markDone(todoID,taskId){
    let todo = this.getTodo(todoID);
    todo.getItem(taskId).markDone();
  }
  markUndone(todoID,taskId){
    let todo = this.getTodo(todoID);
    todo.getItem(taskId).markUndone();
  }
}

module.exports = User;

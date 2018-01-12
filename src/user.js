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
  addTodo(title,desc){
    let todoID = `todo${this.noOfTodos + 1}`;
    this.todos[todoID] = new TodoList(todoID,title,desc);
  }
  getTodo(todoId){
    return this.todos[todoId];
  }
  addTodoItem(todoID,title,desc){
    let todo = this.getTodo(todoID);
    todo.addItem(title,desc);
  }
  getTodoItem(todoID,itemId){
    return this.getTodo(todoID).getItem(itemId);
  }
  markDone(todoID,itemId){
    let todo = this.getTodo(todoID);
    todo.getItem(itemId).markDone();
  }
  markUndone(todoID,itemId){
    let todo = this.getTodo(todoID);
    todo.getItem(itemId).markUndone();
  }
  editTodo(todoID,fieldToEdit,newContent){
    let todo = this.getTodo(todoID);
    todo.edit(fieldToEdit,newContent);
  }
  deleteItem(todoID,itemId){
    let todo = this.getTodo(todoID);
    todo.deleteItem(itemId);
  }
  deleteTodo(todoID){
    delete this.todos[todoID];
  }
}

module.exports = User;

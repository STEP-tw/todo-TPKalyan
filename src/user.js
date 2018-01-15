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
    Object.keys(this.todos).forEach((title)=>{
      todos.push(this.todos[title]);
    });
    return todos;
  };
  get noOfTodos(){
    return this.allTodos.length;
  }
  toHtmlRow(){
    let html = `
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>edit</th>
      <th>delete</th>
    </tr>`;
    this.allTodos.forEach((todo)=>{html += todo.toHtmlRow()});
    return html;
  }
  addTodo(title,desc=""){
    this.todos[title] = new TodoList(title,desc);
  }
  getTodo(todoId){
    return this.todos[todoId];
  }
  addTodoItem(todoID,itemTitle,desc){
    let todo = this.getTodo(todoID);
    todo.addItem(itemTitle,desc);
  }
  getTodoItem(title,itemId){
    return this.getTodo(title).getItem(itemId);
  }
  markDone(title,itemId){
    let todo = this.getTodo(title);
    todo.getItem(itemId).markDone();
  }
  markUndone(title,itemId){
    let todo = this.getTodo(title);
    todo.getItem(itemId).markUndone();
  }
  editTodo(title,fieldToEdit,newContent){
    let todo = this.getTodo(title);
    todo.edit(fieldToEdit,newContent);
  }
  deleteItem(title,itemId){
    let todo = this.getTodo(title);
    todo.deleteItem(itemId);
  }
  deleteTodo(title){
    delete this.todos[title];
  }
}

module.exports = User;

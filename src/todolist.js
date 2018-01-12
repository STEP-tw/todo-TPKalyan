const TodoItem = require('./todoitem.js');

class TodoList {
  constructor(id,title,desc) {
    this.id = id;
    this._title = title;
    this.desc = desc;
    this.items = {};
  }
  get ID(){
    return this.id;
  }
  get title(){
    return this._title;
  }
  get description(){
    return this.desc;
  }
  get getItems(){
    let items = [];
    Object.keys(this.items).forEach((taskID)=>{
      items.push(this.items[taskID]);
    });
    return items;
  }
  get noOfTasks(){
    return this.getItems.length;
  }
  getTask(taskId){
    return this.items[taskId];
  }
  editTitle(newTitle){
    this._title = newTitle
  }
  editDescription(newDesc){
    this.desc = newDesc;
  }
  addTask(title,desc){
    let taskID = `item${this.noOfTasks + 1}`;
    this.items[taskID] = new TodoItem(taskID,title,desc);
  }
  editTask(taskID,fieldToEdit,newContent){
    this.items[taskID][fieldToEdit] = newContent;
  }
  deleteTask(taskID){
    delete this.items[taskID];
  }
  map(mapper){
    this.getItems.map();
  }
  markTaskDone(taskID){
    this.items[taskID].markDone();
  }
  markTaskUndone(taskID){
    this.items[taskID].markUndone();
  }
}

module.exports = TodoList;

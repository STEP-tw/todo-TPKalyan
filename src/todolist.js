const TodoItem = require('./todoitem.js');

returnRequest = function(urlToRequest,data=''){
  return `function(){
    let request = new XMLHttpRequest();
    request.onload = writeTodos;
    request.open("GET",${urlToRequest});
    request.send(data);
  }`;
}

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
  get noOfItems(){
    return this.getItems.length;
  }
  getItem(taskId){
    return this.items[taskId];
  }
  edit(fieldToEdit,newTitle){
    this[fieldToEdit] = newTitle
  }
  addItem(title,desc){
    let taskID = `item${this.noOfItems + 1}`;
    this.items[taskID] = new TodoItem(taskID,title,desc);
  }
  editItem(taskID,fieldToEdit,newContent){
    this.items[taskID][fieldToEdit] = newContent;
  }
  deleteItem(taskID){
    delete this.items[taskID];
  }
  map(mapper){
    this.getItems.map();
  }
  markItemDone(taskID){
    this.items[taskID].markDone();
  }
  markItemUndone(taskID){
    this.items[taskID].markUndone();
  }
  toHtml(){
    let html = `
    <tr onclick = "window.location = '${this.id}'">
      <td>${this.id}</td>
      <td>${this._title}</td>
      <td>${this.desc}</td>
      <td><img onclick = "${returnRequest(`/edit${this.id}`)}" class="icon" src="/edit.jpg" alt="edit icon"/></td>
      <td><img onclick = "${returnRequest(`/delete${this.id}`)}" class="icon" src="/delete.jpg" alt="delete icon"/></td>
    </tr>`;
    return html;
  }
}

module.exports = TodoList;

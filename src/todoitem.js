class TodoItem {
  constructor(id,title,desc) {
    this.id = id;
    this._title = title;
    this.desc = desc;
    this.done = false;
  }
  get title(){
    return this._title;
  }
  get description(){
    return this.desc;
  }
  editTitle(newTitle){
    this._title = newTitle;
  }
  editDescription(newDescription){
    this.desc = newDescription;
  }
  get ID(){
    return this.id;
  }
  markDone(){
    this.done = true;
  }
  markUndone(){
    this.done = false;
  }
  get isDone(){
    return this.done;
  }
}

module.exports = TodoItem;

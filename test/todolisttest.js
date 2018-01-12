const assert = require('chai').assert;
const TodoList = require('../src/todolist.js');
const TodoItem = require('../src/todoItem.js');

describe('testing todo list',()=>{
  beforeEach(()=>{
    todo = new TodoList('todo1',"this is a todo",'this is the description of the todo')
  });
  it('should get the id',()=>{
    assert.equal(todo.ID,'todo1');
  });
  it('should get the title',()=>{
    assert.equal(todo.title,'this is a todo');
  });
  it('should get the description ',()=>{
    assert.equal(todo.description,'this is the description of the todo');
  });
  it('should get all tasks it have',()=>{
    assert.equal(todo.noOfItems,0);
  });
  it('should get a particular task based on its id',()=>{
    todo.addItem('new task','this is a new task');
    todo.addItem('another new task','this is another new task');
    let expected = new TodoItem('item1','new task','this is a new task')
    assert.deepEqual(todo.getItem('item1'),expected);
  });
  it('should edit the title',()=>{
    assert.equal(todo.title,'this is a todo');
    todo.editTitle("this is edited title");
    assert.equal(todo.title,"this is edited title")
  });
  it('should edit the description',()=>{
    assert.equal(todo.description,'this is the description of the todo');
    todo.editDescription('this is new description');
    assert.equal(todo.description,"this is new description");
  });
  it('should add a new task',()=>{
    todo.addItem('new task','this is a new task');
    let expected = new TodoItem('item1','new task','this is a new task');
    assert.deepEqual(todo.getItem('item1'),expected);
  });
  it('should edit the task',()=>{
    todo.addItem('new task','this is a new task');
    let expected = new TodoItem('item1','new task','this is a new task');
    expected.editTitle('this is new title');
    todo.editItem('item1','_title','this is new title');
    assert.deepEqual(todo.getItem('item1'),expected);
    expected.editDescription('this is new description');
    todo.editItem('item1','desc','this is new description');
    assert.deepEqual(todo.getItem('item1'),expected);
  });
  it('should delete a task',()=>{
    todo.addItem('new task','this is a new task');
    todo.addItem('another new task','this is another new task');
    let expected = []
    expected.push(new TodoItem('item1','new task','this is a new task'));
    expected.push(new TodoItem('item2','another new task','this is another new task'));
    assert.deepEqual(todo.getItems,expected);
    expected.shift();
    todo.deleteItem('item1');
    assert.deepEqual(todo.getItems,expected);
  });
  it('should mark a task as done',()=>{
    todo.addItem('new task','this is a new task');
    todo.addItem('another new task','this is another new task');
    let expected = new TodoItem('item1','new task','this is a new task');
    todo.markItemDone('item1');
    expected.markDone();
    assert.deepEqual(todo.getItem('item1'),expected);
  });
  it('should mark a task undone',()=>{
    todo.addItem('new task','this is a new task');
    todo.addItem('another new task','this is another new task');
    let expected = new TodoItem('item1','new task','this is a new task');
    todo.markItemDone('item1');
    expected.markDone();
    assert.deepEqual(todo.getItem('item1'),expected);
    todo.markItemUndone('item1');
    expected.markUndone();
    assert.deepEqual(todo.getItem('item1'),expected);
  });
});

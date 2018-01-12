const assert = require('chai').assert;
const TodoItem = require('../src/todoitem.js');
const TodoList = require('../src/todolist.js');
const User = require('../src/user.js');

describe('testing user module',()=>{
  beforeEach(()=>{
    user = new User('pawan');
  });
  it('should get the user name',()=>{
    assert.equal(user.name,'pawan');
  });
  it('should return the count of todos',()=>{
    assert.equal(user.noOfTodos,0);
  });
  it('should add a todo',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    let expected = new TodoList('todo1','a new Todo',"this is a new Todo");
    assert.deepEqual(user.getTodo('todo1'),expected);
  });
  it('should add a todo item',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('todo1','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    assert.deepEqual(user.getTodoItem('todo1','item1'),expected);
  });
  it('should mark particular as done',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('todo1','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    expected.markDone();
    let item = user.getTodoItem('todo1','item1');
    item.markDone();
    assert.deepEqual(item,expected);
  });
  it('should mark particular as undone',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('todo1','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    expected.markDone();
    let item = user.getTodoItem('todo1','item1');
    item.markDone();
    assert.deepEqual(item,expected);
    item.markUndone();
    expected.markUndone();
    assert.deepEqual(item,expected);
  });
  it('should edit the todo details',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    let expected = new TodoList('todo1','a new Todo',"this is a new Todo");
    let todo = user.getTodo('todo1');
    assert.deepEqual(todo,expected);

    expected.edit('_title',"this is new Title");
    user.editTodo('todo1','_title',"this is new Title")
    assert.deepEqual(todo,expected);
  });
  it('should remove the todo',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    let expected = new TodoList('todo1','a new Todo',"this is a new Todo");
    assert.deepEqual(user.getTodo('todo1'),expected);
    user.deleteTodo('todo1');
    assert.isUndefined(user.getTodo('todo1'));
  });
  it('should remove the todo element',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('todo1','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    assert.deepEqual(user.getTodoItem('todo1','item1'),expected);
    user.deleteItem('todo1','item1');
    assert.isUndefined(user.getTodoItem('todo1','item1'));
  });
});

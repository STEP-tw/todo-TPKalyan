const assert = require('chai').assert;
const TodoItem = require('../src/todoitem.js');
const TodoList = require('../src/todolist.js');
const User = require('../src/user.js');

describe('testing user mode',()=>{
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
    let expected = new TodoList('a new Todo',"this is a new Todo");
    assert.deepEqual(user.getTodo('a new Todo'),expected);
  });
  it('should add a todo item',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('a new Todo','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    assert.deepEqual(user.getTodoItem('a new Todo','item1'),expected);
  });
  it('should mark particular as done',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('a new Todo','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    expected.markDone();
    let item = user.getTodoItem('a new Todo','item1');
    item.markDone();
    assert.deepEqual(item,expected);
  });
  it('should mark particular as undone',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('a new Todo','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    expected.markDone();
    let item = user.getTodoItem('a new Todo','item1');
    item.markDone();
    assert.deepEqual(item,expected);
    item.markUndone();
    expected.markUndone();
    assert.deepEqual(item,expected);
  });
  it('should edit the todo details',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    let expected = new TodoList('a new Todo',"this is a new Todo");
    let todo = user.getTodo('a new Todo');
    assert.deepEqual(todo,expected);

    expected.edit('_title',"this is new Title");
    user.editTodo('a new Todo','_title',"this is new Title")
    assert.deepEqual(todo,expected);
  });
  it('should remove the todo',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    let expected = new TodoList('a new Todo',"this is a new Todo");
    assert.deepEqual(user.getTodo('a new Todo'),expected);
    user.deleteTodo('a new Todo');
    assert.isUndefined(user.getTodo('a new Todo'));
  });
  it('should remove the todo element',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('a new Todo','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");
    assert.deepEqual(user.getTodoItem('a new Todo','item1'),expected);
    user.deleteItem('a new Todo','item1');
    assert.isUndefined(user.getTodoItem('a new Todo','item1'));
  });
});

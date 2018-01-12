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
    let todo = user.getTodo('todo1');
    assert.deepEqual(todo.getItem('item1'),expected);
  });
  it('should mark particular as done',()=>{
    user.addTodo('a new Todo',"this is a new Todo");
    user.addTodoItem('todo1','a new task',"this is a new task");
    let expected = new TodoItem('item1','a new task',"this is a new task");

  });
});

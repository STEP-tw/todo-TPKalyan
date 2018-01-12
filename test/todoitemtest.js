const assert = require('chai').assert;
const TodoItem = require('../src/todoItem.js');

describe('testing todo item',()=>{
  beforeEach(()=>{
    task = new TodoItem('item1','to write test cases','to write tests for todo item module');
  });
  it('should get the id',()=>{
    assert.equal(task.ID,'item1');
  });
  it('should get the title',()=>{
    assert.equal(task.title,'to write test cases');
  });
  it('should get the description ',()=>{
    assert.equal(task.description,'to write tests for todo item module');
  });
  it('should edit the title',()=>{
    assert.equal(task.title,'to write test cases');
    task.editTitle("this is edited title");
    assert.equal(task.title,"this is edited title")
  });
  it('should edit the description',()=>{
    assert.equal(task.description,'to write tests for todo item module');
    task.editDescription('this is new description');
    assert.equal(task.description,"this is new description");
  });
  it('should be undone previous',()=>{
    assert.isNotOk(task.isDone);
  });
  it('should done when we said markDone',()=>{
    task.markDone();
    assert.isOk(task.isDone);
  });
  it('should unDone when we said markUndone',()=>{
    assert.isNotOk(task.isDone);
    task.markDone();
    assert.isOk(task.isDone);
    task.markUndone();
    assert.isNotOk(task.isDone);
  });
});

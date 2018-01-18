const assert = require('chai').assert;
const TodoItem = require('../src/model/todoitem.js');
const TodoList = require('../src/model/todolist.js');
const User = require('../src/model/user.js');

describe('model',()=>{
  describe('todo item',()=>{
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
  describe('todo list',()=>{
    beforeEach(()=>{
      todo = new TodoList("this is a todo",'this is the description of the todo')
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
      todo.edit('_title',"this is edited title");
      assert.equal(todo.title,"this is edited title")
    });
    it('should edit the description',()=>{
      assert.equal(todo.description,'this is the description of the todo');
      todo.edit('desc','this is new description');
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
  describe('user mode',()=>{
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
});

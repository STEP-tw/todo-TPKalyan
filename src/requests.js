writeName = function(){
  let userName = this.responseText;
  document.getElementById('userName').innerText = `Welcome ${userName}`;
};
writeTodos = function(){
  let todos = JSON.parse(this.responseText);
  let table = document.getElementById('todos');
  table.innerHTML = todos;
}
getName = function(){
  let userNameRequest = new XMLHttpRequest();
  userNameRequest.onload = writeName;
  userNameRequest.open("GET","/getUserName");
  userNameRequest.send();
};
populateTodos = function(){
  let todoRequest = new XMLHttpRequest();
  todoRequest.onload = writeTodos;
  todoRequest.open("GET","/getTodos");
  todoRequest.send();
};

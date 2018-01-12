writeName = function(){
  let userName = this.responseText;
  document.getElementById('userName').innerText = `Welcome ${userName}`;
};
writeTodos = function(){
  let todos = JSON.parse(this.responseText);
  let table = document.getElementById('todos');
  todos.forEach((todo)=>{
    let row = document.createElement('tr');
    let title = document.createElement('td');
    let titleText = document.createTextNode(todo._title);
    title.appendChild(titleText);
    let desc = document.createElement('td');
    let descText = document.createTextNode(todo.desc);
    desc.appendChild(descText);
    row.appendChild(title);
    row.appendChild(desc);
    row.id = todo.id;
    row.onclick = `window.location = ${todo.id}`;
    table.appendChild(row);
  });
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

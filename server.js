const http = require('http');
const fs = require('fs');
const webapp = require('./webapp.js');
const data = require('./data/usersdata.json');
const User = require('./src/user.js');
const port = process.argv[process.argv.length - 1];

let head = fs.readFileSync('./src/headTodo.txt');
let tail = fs.readFileSync('./src/tailTodo.txt');

let allTodos = {};
try {
  allTodos = JSON.parse(fs.readFileSync('./data/usersdata.json'));
} catch (e) {
  allTodos = {};
}

let users = ['bhanutv','harshab','madhu'];

let registered_users = users.map((user)=>{
  let newUser = new User(user);
  return newUser;
});

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const contentType = {
  "html" : "text/html",
  "txt" : "text/plain",
  "css" : "text/css",
  "js" : "text/javascript",
  "jpg" : "image/jpg",
  "ico" : "image/jpg",
  "gif" : "image/gif",
  "pdf" : "application/pdf"
};

const getExtension = (filePath)=>{
  return filePath.substr(filePath.lastIndexOf('.')+1);
}

const addTodo = function(user,title,desc){
  user.addTodo(title,desc);
}

const serveStaticFile = function(filePath){
  return function(req,res){
    res.setHeader("Content-Type",contentType[getExtension(filePath)]);
    res.statusCode = 200;
    res.write(fs.readFileSync(filePath));
    res.end();
  }
}

const createUser = function(name){
  let user = registered_users.find(user=>user.name == name);
  if(!user){
    registered_users.push(new User(name));
    data[name] = [];
  }
};

const redirectLoggedOutUserToLogin = function(req,res){
  if(!req.urlIsOneOf(['/login']) && !req.user) res.redirect('/login');
}

const redirectLoggedInUserToHome = function(req,res){
  if(req.urlIsOneOf(['/login','/login.html']) && req.user) res.redirect('/index');
}

let staticHTMLPages = ['/index','/addTodo','/'];

let staticCSSPages = ['/styles.css']

let images = ['/edit.jpg','/delete.jpg'];

let app = webapp.create();

staticHTMLPages.forEach((url)=>{
  app.get(url,serveStaticFile(`./src/${(url == '/' ? '/index' : url)}.html`));
})

staticCSSPages.forEach((url)=>{
  app.get(url,serveStaticFile(`./src/${url}`));
})

images.forEach((url)=>{
  app.get(url,serveStaticFile(`./src/images${url}`))
})

app.use(loadUser);

app.use(redirectLoggedInUserToHome);

app.use(redirectLoggedOutUserToLogin);

app.get('/requests.js',serveStaticFile('./src/requests.js'));

app.get('/getTodos',(req,res)=>{
  let todos = JSON.stringify(req.user.toHtmlRow());
  res.write(todos);
  res.end();
})

app.get('/getUserName',(req,res)=>{
  res.write(req.user.name);
  res.end();
})

app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  if(req.cookies.logInFailed) res.write('<p>logIn Failed</p>');
  res.write('<form method="POST"> <input name="userName"><input name="place"> <input type="submit"></form>');
  res.end();
});

app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.allTodos.forEach((todo)=>{
    app.get(`${todo.id}`,(req,res)=>{
      res.write(fs.readFileSync('./openTodo.html','utf8'));
      res.end();
    });
  })
  user.sessionid = sessionid;
  res.redirect('/');
});

app.get('/logout',(req,res)=>{
  delete registered_users.find(user=>user.name == req.user.name).sessionid;

  res.redirect('/login');
  res.end();
});

app.post('/addTodo',(req,res)=>{
  let user = req.user;
  let title = req.body.title.replace(/\+/g,' ');
  let desc = req.body.desc.replace(/\+/g,' ');
  addTodo(user,title,desc);
  let todo = user.getTodo(title);
  app.get(`/${title}`,(req,res)=>{
    res.write(`${head}
      ${todo.toHtml()}
      ${tail}`);
    res.end();
  })
  res.redirect('/index');
})

let server = http.createServer(app).listen(port);

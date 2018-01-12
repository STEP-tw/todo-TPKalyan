const http = require('http');

let invoke = function(req,res){
  let handler = this._handlers[req.method][req.url];
  if(!handler){
    res.statusCode = 404;
    res.end();
    return;
  }
  handler(req,res);
}

let parseBody = (text)=> text && text.split('&').reduce((body,keyValuePair)=>{
  let contents = keyValuePair.split('=');
  body[contents[0]] = contents[1];
  return body;
},{});

const init = function (){
  this._handlers = {GET:{},POST:{}};
  this._preProcessors = [];
}

const get = function(url,callback){
  this._handlers.GET[url] = callback;
}
const post = function(url,callback){
  this._handlers.POST[url] = callback;
}
const use = function(callback){
  this._preProcessors.push(callback)
}
const main = function(req,res){
  let content = "";
  this._preProcessors.forEach(f=>f(req,res));
  console.log(`${req.method} ${req.url}`);
  req.on('data',function(data){
    content += data.toString();
  });
  req.on('end',()=>{
    req.body = parseBody(content);
    content = "";
    console.log("Data :",req.body);
    invoke.call(this,req,res);
  })
}

let create = function(){
  let webApp = function(req,res){
    main.call(webApp,req,res)
  };
  init.call(webApp)
  webApp.get = get;
  webApp.post = post;
  webApp.use = use;
  return webApp;
}

exports.create = create;

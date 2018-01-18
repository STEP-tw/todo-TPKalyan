const assert = require('chai').assert;
let app = require('../app.js');
let testHelper = require('../src/utils/testHelper.js');
let request = require('../src/utils/requestSimulator.js');
let session = {Id:1234};
let create = (user)=> {
  session.user = user;
  return session;
}
let load = (sessionId)=> sessionId==1234&&session;
let remove;
app.sessionManager = {load,remove,create};
describe('app',()=>{
  describe('redirect to /login when user is not loggedin',()=>{
    it('responds with 302 when asked for existing page',(done)=>{
      request(app,{method:'GET',url:'/index'},(res)=>{
        testHelper.should_be_redirected_to(res,'/login');
        testHelper.body_should_empty(res);
        done();
      });
    });
    it('responds with 302 when asked for bad page',(done)=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        testHelper.should_be_redirected_to(res,'/login');
        testHelper.body_should_empty(res);
        done();
      });
    });
  });
  describe('GET /login',()=>{
    it('responds with 200',()=>{
      request(app,{method:"GET",url:"/login"},(res)=>{
        testHelper.status_is_ok(res);
        testHelper.body_contains(res,'</form>');
      });
    });
  });
  describe('POST /login',()=>{
    it('redirect to GET /login if user details are invalid',()=>{
      request(app,{method:'POST',url:'/login',body:'username=bhanu'},(res)=>{
        testHelper.should_be_redirected_to(res,'/login');
      });
    })
    it('redirect to /index if user details are valid',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=bhanutv'},(res)=>{
        testHelper.should_not_have_cookie(res,'logInFailed');
        testHelper.should_be_redirected_to(res,'/index');
        testHelper.should_have_cookie(res,'sessionid')
      });
    })
  });
});

const coursesController = require('../controllers/courses');
const auth = require('../controllers/auth');
const login = require('../controllers/login');
async function routes(fastify, options) {
    fastify.get('/',async (request, reply) => {
      try{
        let permission = false;
        let token = request.headers.authtoken? request.headers.authtoken: null;
        if(token){
          let authToken = login.validate(token);
        if(authToken.role == 'admin'){
          permission = true
        }
        }
        const courses = await coursesController.getCourses();
        reply.send({courses,permission});
      }catch(err){
        console.log(err);
        reply.send({message: err.message});
      }

    });
    fastify.post('/', authorization(async (request,reply)=>{
      try {
        const payload = request.body;
        const created = await coursesController.create(payload);
        reply.send(created);
      } catch (err) {
        console.log(err);
        reply.send({message: err.message});
      }
    }));
    fastify.put('/:id',authorization(async (request,reply)=>{
      try {
        const {id} = request.params;
        const payload = request.body;
        const course = await coursesController.update(id,payload);
        reply.send(course);
      } catch (err) {
        console.log(err);
        reply.send({message: err.message});
      }
    }));
    fastify.get('/:id',async (request,reply)=>{
      try {
        let permission = false;
        let token = request.headers.authtoken? request.headers.authtoken: null;
        if(token){
          let authToken = login.validate(token);
        if(authToken.role == 'admin'){
          permission = true
        }
        }
        const {id} = request.params;
        const course = await coursesController.get(id);
        reply.send({course,permission});
      } catch (err) {
        console.log(err);
        reply.send({message: err.message});
      }
    });
    fastify.delete('/:id',authorization(async (request,reply)=>{
      try {
        const {id} = request.params;
        const deleted = await coursesController.delete(id);
        reply.send(deleted);
      } catch (err) {
        console.log(err);
        reply.send({message: err.message});
      }
    }));
  }

function authorization (fn) {
  return async(request,reply) => {

    let token = request.headers.authtoken? request.headers.authtoken: null;
    if(!token || token == 'null'){
      request.log.error('action: authorization|error: No token provided 1');
      reply.send({message: 'action: authorization|error: No token provided 1'});
      return;
    }else{
      try {

        let authToken = login.validate(token);
        if(authToken.role == 'admin'){
          return await fn(request,reply);
        }else{
          
        request.log.error('action: authorization|error: No token provided 3');
        reply.send({message: 'action: authorization|error: No token provided 3'});
        return;
        }
      } catch (err) {
        console.log(err);
        request.log.error('action: authorization|error: No token provided 2');
        reply.send({message: 'action: authorization|error: No token provided 2'});
        return;
      }
    }
  }
}

module.exports = routes
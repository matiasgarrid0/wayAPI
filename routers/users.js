const userController = require('../controllers/users');
const mercadoPago = require('../controllers/mercadoPago');
const login = require('../controllers/login');
async function routes(fastify, options, next) {
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await userController.findUser(id);
      reply.send(user);
    } catch (err) {
      console.log(err);
      reply.send({ message: err.message });
    }
  });
  fastify.post('/', async (request, reply) => {
    try {
      const payload = request.body;
      const created = await userController.create(payload);
      reply.send(created);
    } catch (err) {
      console.log(err);
      reply.send({message: err.message});
    }
  });
  fastify.delete('/:id', async (request,reply)=>{
    try {
      const {id} = request.params;
      const deleted = await userController.deleteUser(id);
      reply.send(deleted);
    } catch (err) {
      console.log(err);
      reply.send({message: err.message});
    }
  });
  fastify.post('/pagar',authorization(async (request,reply)=>{
    try {
      const payload = request.body;
      const pagado = await mercadoPago.pagar(payload);
      reply.send(pagado);
    } catch (err) {
      console.log(err);
      reply.send({message: err.message});
    }
  }));
}
function authorization (fn) {
  return async(request,reply) => {

    let token = request.headers.authtoken? request.headers.authtoken: null;
    console.log(request.headers);
    console.log(token);
    if(!token || token == 'null'){
      request.log.error('action: authorization|error: No token provided 1');
      reply.send({message: 'action: authorization|error: No token provided 1'});
      return;
    }else{
      try {

        let authToken = login.validate(token);
       
          return await fn(request,reply);
      } catch (err) {
        console.log(err);
        request.log.error('action: authorization|error: No token provided 2');
        reply.send({message: 'action: authorization|error: No token provided 2'});
        return;
      }
    }
  }
}
module.exports = routes;
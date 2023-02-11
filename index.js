const fastify = require('fastify')({
  logger: true
});
// routes
const usersRouter = require('./routers/users.js');
const coursesRouter = require('./routers/courses');
const login = require('./controllers/login');

// registers
fastify.register(usersRouter, { prefix: '/users' });
fastify.register(coursesRouter, { prefix: '/courses' });
fastify.register(require('@fastify/cors'));

// login
fastify.post('/login', async (request, reply) => {
  try {
    const { user, password } = request.body;
    const token = await login.login( user, password);
    reply.send({token});
  } catch (err) {
    console.log(err);
    reply.send({ message: err.message });
  }
})
// Run the server!
fastify.listen({ port: 3040 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
const login = require('./login');

module.exports = async (request,reply) => {
  let token = request.headers.authToken? request.headers.authToken.substring(7): null;
  if(!token || token == 'null'){
    request.log.error('action: authorization|error: No token provided');
    reply.send({message: 'action: authorization|error: No token provided'});
    return;
  }else{
    try {
      request.authToken = {...login.validate(token),log: request.log};
    } catch (err) {
      request.log.error('action: authorization|error: No token provided');
      request.authToken = null;
      reply.send({message: 'action: authorization|error: No token provided'});
      return;
    }
  }
}
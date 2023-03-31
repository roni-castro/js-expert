const {once} = require('events');
const http = require('http');

const DEFAULT_USER = {
  username: 'Roni',
  password: '123'
};

const routes = {
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, 'data'));
    const toLower = (text) => text.toLowerCase();
    if (
      toLower(data.username) !== toLower(DEFAULT_USER.username) ||
      data.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.end('User credentials is invalid');
      return;
    }
    response.end('ok login');
  },
  '/contact:get': (_request, response) => {
    response.write('contact us page');
    return response.end();
  },
  default: (_request, response) => {
    response.writeHead(404);
    return response.end('not found');
  }
};

function handler(request, response) {
  const {method, url} = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const routeFound = routes[routeKey] || routes.default;
  return routeFound(request, response);
}

const app = http.createServer(handler).listen(3000, () => {
  console.log('server listening on port 3000');
});

module.exports = app;

const { once } = require('events');
const http = require('http');

const DEFAULT_USER = {
  username: 'Roni',
  password: '123'
};

const routes = {
  '/login:post': async (request, response) => {
    const data = await once(request, 'data');
    const body = JSON.parse(data);
    if (!("username" in body) || !("password" in body)) {
      response.writeHead(400);
      return response.end('username and password are required');
    }

    const { username, password } = body;
    const toLower = (data) => data.toLowerCase();
    if (toLower(username) === toLower(DEFAULT_USER.username) && password === DEFAULT_USER.password) {
      return response.end('login success');
    } else {
      response.writeHead(401);
      return response.end('User credentials is invalid');
    }
  },
  '/contact:get': (_request, response) => {
    return response.end("contact us page");
  },
  default: (_request, response) => {
    response.writeHead(404);
    return response.end('Route not found');
  }
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method}`.toLowerCase();
  const routeFn = routes[routeKey] || routes.default;

  return routeFn(request, response);
}

const app = http.createServer(handler).listen(3000, () => {
  console.log('server listening on port 3000');
});

module.exports = app;

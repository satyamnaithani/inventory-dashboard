const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3008/' : 'https://nodejs-msql-backend.herokuapp.com/';
module.exports = {
    reactStrictMode: true,
    env: {
      SERVER_URL : server,
      COMPANY_NAME : 'ABC'
    },
  }
  
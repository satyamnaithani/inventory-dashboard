export { default as fetchApi } from './fetchApi';
const dev = process.env.NODE_ENV !== 'production';
//export const server = 'https://nodejs-msql-backend.herokuapp.com/';
export const company = {
    name: "XYZ"
}
export const server = dev ? 'http://localhost:3008/' : 'https://nodejs-msql-backend.herokuapp.com/';

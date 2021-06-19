import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const dev = process.env.NODE_ENV !== 'production';
const baseUrl = dev ? 'http://localhost:3008/' : 'https://nodejs-msql-backend.herokuapp.com/';

export const useGetData = (path) => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = baseUrl + path

  const { data, error } = useSWR(url, fetcher)

  return { data, error }
}
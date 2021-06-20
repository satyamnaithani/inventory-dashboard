import useSWR from "swr";
const dev = process.env.NODE_ENV !== 'production';
const baseUrl = dev ? 'http://localhost:3008/' : 'https://nodejs-msql-backend.herokuapp.com/';

const getFetcher = url => fetch(url).then(res => res.json());
const postFetcher = params => url => fetch(url, { method: 'POST', body: params }).then(res => res.json());

export const useGetData = (path) => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = baseUrl + path

  const { data, error } = useSWR(url, getFetcher)

  return { data, error }
}

export const usePostData = (path, formData) => {
  if (!path) throw new Error("Path is required");

  const url = baseUrl + path
  const { data, error } = useSWR(url, postFetcher(formData));

  return { data, error }
}
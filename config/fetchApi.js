import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());
const baseUrl = 'http://localhost:3008/';

export const useGetData = (path) => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = baseUrl + path

  const { data, error } = useSWR(url, fetcher)

  return { data, error }
}
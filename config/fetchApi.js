import useSWR, { mutate } from "swr";
import axios from 'axios';

const getFetcher = url => fetch(url).then(res => res.json());

export const useGetData = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = `${process.env.SERVER_URL}${path}`;

  const { data, error } = useSWR(url, getFetcher);

  return { data, error };
}

export const posData = async(path, formData) => {
  if (!path) throw new Error("Path is required");

  const url = `${process.env.SERVER_URL}${path}`;
  const data = await axios({url: url, data: formData, method: 'POST'});
  if(data.status === 201 ) return { msg: 'created'};
  else return data.error
}
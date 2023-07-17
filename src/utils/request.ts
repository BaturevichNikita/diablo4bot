import axios, { AxiosResponse } from 'axios';

const get = async <T>(url: string, headers: { [key: string]: string }): Promise<AxiosResponse<T>> =>
  axios.get(url, { headers, timeout: 1000 });

const post = async <T>(
  url: string,
  headers: { [key: string]: string },
  body: { [key: string]: string }
): Promise<AxiosResponse<T>> => axios.post(url, body, { headers });

const put = async <T>(
  url: string,
  headers: { [key: string]: string },
  body: { [key: string]: string }
): Promise<AxiosResponse<T>> => axios.put(url, body, { headers });

const del = async <T>(
  url: string,
  headers: { [key: string]: string },
  data: { [key: string]: string }
): Promise<AxiosResponse<T>> => axios.delete(url, { headers, data });

export { get, post, put, del };

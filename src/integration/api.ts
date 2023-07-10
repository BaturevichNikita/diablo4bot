import { HttpMethods, MimeTypes } from '../types/http';
import { get, post, put, del } from './request';

type ApiCallResponse<T> = { data: T; status: number };

const apiCall = async <T>(
  _method: HttpMethods,
  _url: string,
  _payload = {},
  _headers = {}
): Promise<ApiCallResponse<T>> => {
  const httpMethodsMap = {
    [HttpMethods.GET]: () => get<T>(_url, _headers),
    [HttpMethods.POST]: () => post<T>(_url, { ..._headers, 'Content-Type': MimeTypes.JSON }, _payload),
    [HttpMethods.PUT]: () => put<T>(_url, { ..._headers, 'Content-Type': MimeTypes.JSON }, _payload),
    [HttpMethods.DELETE]: () => del<T>(_url, _headers, _payload),
  };

  const { data, status } = await httpMethodsMap[_method]();
  return { data, status };
};

export { apiCall, ApiCallResponse };

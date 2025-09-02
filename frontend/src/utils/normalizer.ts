import { AxiosResponse } from 'axios';

// Handles responses that might be wrapped in a `data` object, e.g. { data: [...] }
export const normalizeResponse = (response: AxiosResponse) => {
  // Some APIs might not wrap their response, so we check for `data.data`
  // but fall back to `response.data`.
  if (response.data && response.data.data !== undefined) {
    return response.data.data;
  }
  return response.data;
};

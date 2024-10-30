import { LooseObject } from '../shared/interfaces';
import { isDefined } from './utility';
const BASE_URL = 'https://kosha.platform.dreamx-dev.tech/v1/kosha';
class Http {
  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  private async processResponse(response: Response) {
    if (!response.ok) {
      let message;
      try {
        const res = await response.json();
        message = res.message;
      } catch {
        message = 'Something went wrong';
      }
      throw message;
    }
    return await response.json();
  }
  async get(url: string, params?: LooseObject) {
    const queryString = isDefined(params)
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    const urlToGet = `${BASE_URL}/${url}${queryString}`;
    const response = await fetch(urlToGet, {
      headers: this.getHeaders(),
    });
    return await this.processResponse(response);
  }
  async post(url: string, params?: LooseObject): Promise<any> {
    const body = JSON.stringify(isDefined(params) ? params : {});
    console.log('body is ', typeof body);
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      body: body,
      headers: this.getHeaders(),
    });
    return await this.processResponse(response);
  }
}
const http = new Http();
export default http;

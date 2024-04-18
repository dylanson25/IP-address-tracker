import axios from "axios";
const apiEndPoint = "https://api.ipify.org/";

class ApiIpify {
  constructor() {
    this.request = [];
    this._axios = axios.create({
      baseURL: apiEndPoint,
      headers: {},
    });
  }
  makeRequest(request) {
    const { method, data, url } = request;
    const axiosRequest = {
      ...(data || {}),
    };
    const R = {
      url: `${method}:${url}`,
      axios: {},
    };
    R.axios = this._axios[method](`${url}`, axiosRequest);
    return R.axios;
  }
  get(url, data = {}) {
    return this.makeRequest({ method: "get", url, data });
  }
}

export default new ApiIpify();

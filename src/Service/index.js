import axios from "axios";
import Toast from "react-native-simple-toast";
//import perf from "@react-native-firebase/perf";

class Service {
  constructor() {
    let service = axios.create({
      baseURL: "http://ec2-52-66-250-93.ap-south-1.compute.amazonaws.com:3000/"
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    console.log(response);
    return response;
  }

  handleError = error => {
    console.log(error.message);
    Toast.show(error.toString());
    switch (error.status) {
      case 401:
        Toast.show(error.toString(), Toast.LONG);
        break;
      case 404:
        Toast.show(error.toString(), Toast.LONG);
        break;
      case 500:
        Toast.show(error.toString(), Toast.LONG);
        break;
      default:
        Toast.show(error.toString(), Toast.LONG);
    }
    return Promise.reject(error.response);
  };

  get(path, params = {}) {
    return this.service.get(path, { params });
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload
      })
      .then(response => callback(response.data, response.status));
  }

  post(path, payload, config = {}) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      ...config
    });
  }

  // put(path, payload, callback) {
  //   return this.service
  //     .request({
  //       method: "PUT",
  //       url: path,
  //       responseType: "json",
  //       data: payload
  //     })
  //     .then(response => callback(response.data, response.status));
  // }

  put(path, payload, config = {}) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: payload,
      ...config
    });
  }
 
}

export default new Service();

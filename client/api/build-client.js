import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL:
        'http://my-ingress-ingress-nginx-controller.default.svc.cluster.local/',
      headers: req.headers,
    });
  } else {
    // we are in the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

import fetch from 'isomorphic-fetch';

const fetchApi = (url, method = 'GET', body = {}, token = '') => {
  const queryString = params => (`${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token
    },
    body: queryString(body)
  }

  fetch(url, options).then((resp) => {
    // if (resp.text().ret !== 1) {
    //   return resp.text().then(e => Promise.reject(e));
    // }
    console.log(resp.text());
    return resp.text();
  }).catch(err => (err));
}

export default fetchApi;

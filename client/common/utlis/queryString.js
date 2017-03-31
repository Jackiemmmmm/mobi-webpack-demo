const queryString = params => (`${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`);

export default queryString;

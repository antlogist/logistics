function setParams(config) {
  console.log(config);
  const params = config.params || {};
  config.params = Object.assign(params, {});
  return config;
}

function returnData(res) {
  return res.data;
}

function onError(err) {
  console.dir(err);
  return Promise.reject(err);
}

export default function(axios) {
  axios.interceptors.request.use(setParams);
  axios.interceptors.response.use(returnData, onError);
}

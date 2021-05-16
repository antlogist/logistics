function setParams(config) {
  console.log(config);
  const params = config.params || {};
  config.params = Object.assign(params, {});

  const paymentTokenUrl = config.url.includes("payment-token");
  const cancelOrderUrl = config.url.includes("cancel-order");

  if (paymentTokenUrl || cancelOrderUrl) {
    (config.headers["Content-Type"] = "multipart/form-data"),
      (config.headers["X-Requested-With"] = "XMLHttpRequest"),
      (config.headers["Access-Control-Allow-Origin"] = "*");
  }

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

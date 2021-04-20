import axios from "@/plugins/axios/";

class Orders {
  async fetchOrdersInfo(token) {
    const response = await axios.get(`/orders/read.php?order_token=${token}`);
    return response;
  }
}

const ordersApi = new Orders();

export default ordersApi;

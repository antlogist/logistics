import axios from "@/plugins/axios/";

class Orders {
  async fetchDelivery(date, token) {
    try {
      const response = await axios.get(
        `/bookings/read-delivery-date.php?date=${date}&&order_token=${token}`
      );
      return response;
    } catch (err) {
      console.log({
        ordersApi: err
      });
    }
  }

  async makePayment(token) {
    const data = new FormData();
    data.append("order_token", token);
    try {
      const response = await axios.post(`../inc/payment-token.php`, data);
      console.log({ response });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  
  async cancelOrder(token) {
    const data = new FormData();
    data.append("order_token", token);
    try {
      const response = await axios.post(`../inc/cancel-order.php`, data);
      console.log({ response });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

const ordersApi = new Orders();

export default ordersApi;

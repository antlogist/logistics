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
    const data = {
      order_token: token
    };
    try {
      const response = await axios.post(
        `/inc/payment-token.php`,
        JSON.stringify(data)
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

const ordersApi = new Orders();

export default ordersApi;

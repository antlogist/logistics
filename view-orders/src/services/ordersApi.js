import axios from "@/plugins/axios/";

class Orders {
  async fetchDelivery(date, token) {
    const response = await axios.get(
      `/bookings/read-delivery-date.php?date=${date}&&order_token=${token}`
    );
    return response;
  }
}

const ordersApi = new Orders();

export default ordersApi;

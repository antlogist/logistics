import axios from "@/plugins/axios/";

class Booking {
  async fetchTimeslots() {
    const response = await axios.get(`/timeslots/read-timeslot.php`);
    return response;
  }

  async fetchSettings() {
    const response = await axios.get(`/settings/read-settings.php`);
    return response;
  }

  async fetchDayoffs(month) {
    const response = await axios.get(`/calendar/read.php?month=${month}`);
    return response;
  }

  async placeOrder(order) {
    const data = {
      name: order.name,
      email: order.email,
      date: order.date,
      timeslot: order.timeslot,
      phone: order.phone,
      address: order.address,
      order_id: order.order_id,
      order_token: order.order_token,
      start_at: order.start_at,
      end_at: order.end_at
    };

    const response = await axios.post(
      `/bookings/create.php`,
      JSON.stringify(data)
    );
    return response;
  }

  async makePayment(token) {
    const data = new FormData();
    data.append("order_token", token);
    try {
      const response = await axios.post(`../inc/payment-token.php`, data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async checkOrderToken(token, start_date, end_date) {
    try {
      const response = await axios.post(
        `/bookings/check-order-token.php?order_token=${token}&&start_date=${start_date}&&end_date=${end_date}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

const bookingApi = new Booking();
export default bookingApi;

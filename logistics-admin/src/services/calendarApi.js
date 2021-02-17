import axios from "@/plugins/axios/";

class Calendar {
  async fetchDayoffs(month) {
    //    console.log(month);
    const response = await axios.get(`/calendar/read.php?month=${month}`);
    return response;
  }
  async createDayoff(date) {
    console.log(date);
    const data = {
      date_id: date,
      date: date,
      date_title: "Day-off",
      month: date.substring(0, 7)
    };
    const response = await axios.post(
      `/calendar/create.php`,
      JSON.stringify(data)
    );
    return response;
  }
  async deleteDayoff(id) {
    console.log(id);
    const data = {
      date_id: id
    };
    const response = await axios.post(
      `/calendar/delete.php`,
      JSON.stringify(data)
    );
    return response;
  }
  async fetchOrders(startDate, endDate) {
    console.log(startDate, endDate);
    const response = await axios.get(
      `/bookings/read.php?start_date=${startDate}&&end_date=${endDate}&&session_id=${sessionId}`
    );
    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

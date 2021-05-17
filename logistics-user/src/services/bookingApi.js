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
}

const bookingApi = new Booking();
export default bookingApi;

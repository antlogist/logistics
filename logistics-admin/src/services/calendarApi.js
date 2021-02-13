import axios from "@/plugins/axios/";

class Calendar {
  async fetchDayoffs(month) {
    console.log(month);
    const response = await axios.get(`/read.php?month=${month}`);
    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

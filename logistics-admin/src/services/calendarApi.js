import axios from "@/plugins/axios/";

class Calendar {
  async fetchDayoffs(month) {
    //    console.log(month);
    const response = await axios.get(`/read.php?month=${month}`);
    return response;
  }
  async createDayoff(date) {
    //    console.log(month);
    //    const response = await axios.get(`/read.php?month=${date}`);
    console.log(date);
    //    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

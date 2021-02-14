import axios from "@/plugins/axios/";

class Calendar {
  async fetchDayoffs(month) {
    //    console.log(month);
    const response = await axios.get(`/read.php?month=${month}`);
    return response;
  }
  async createDayoff(date) {
    console.log(date);
    const data = {
      date: "2021-04-11",
      date_title: "HB",
      month: "2021-04"
    };
    const response = await axios.post(`/create.php`, JSON.stringify(data));
    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

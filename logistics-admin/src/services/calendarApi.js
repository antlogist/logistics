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
      date: date,
      date_title: "Day-off",
      month: date.substring(0, 7)
    };
    const response = await axios.post(`/create.php`, JSON.stringify(data));
    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

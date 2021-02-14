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
      date_id: date,
      date: date,
      date_title: "Day-off",
      month: date.substring(0, 7)
    };
    const response = await axios.post(`/create.php`, JSON.stringify(data));
    return response;
  }
  async deleteDayoff(id) {
    console.log(id);
    const data = {
      date_id: id
    };
    const response = await axios.post(`/delete.php`, JSON.stringify(data));
    return response;
  }
}

const calendarApi = new Calendar();

export default calendarApi;

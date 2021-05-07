import axios from "@/plugins/axios/";

class Timeslots {
  async createCustomTimeslot(timeslot) {
    console.log(timeslot);
    const data = {
      date: timeslot.date,
      weekday: timeslot.weekday,
      start_at: timeslot.start_at,
      end_at: timeslot.end_at
    };

    const response = await axios.post(
      `/timeslots/create-custom-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }

  async fetchCustomTimeslots(date) {
    console.log(date);
    const response = await axios.get(
      `/timeslots/read-custom-timeslot.php?date=${date}`
    );
    console.log(response);
    return response;
  }

  async deleteTimeslots(id) {
    const data = {
      id: id
    };
    const response = await axios.post(
      `/timeslots/delete-custom-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }
}

const timeslotsApi = new Timeslots();
export default timeslotsApi;

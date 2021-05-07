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
}

const timeslotsApi = new Timeslots();
export default timeslotsApi;

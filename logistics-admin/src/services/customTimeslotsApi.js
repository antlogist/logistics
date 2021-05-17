import axios from "@/plugins/axios/";

class CustomTimeslots {
  async createCustomTimeslot(timeslot) {
    console.log(timeslot);
    const data = {
      date: timeslot.date,
      weekday: timeslot.weekday,
      start_at: timeslot.start_at,
      end_at: timeslot.end_at,
      session_id: sessionId
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

  async deleteTimeslot(id) {
    const data = {
      id: id,
      session_id: sessionId
    };
    const response = await axios.post(
      `/timeslots/delete-custom-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }

  async updateTimeslot(timeslot) {
    const data = {
      id: timeslot.id,
      start_at: timeslot.start_at,
      end_at: timeslot.end_at,
      session_id: sessionId
    };

    const response = await axios.post(
      `/timeslots/update-custom-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }
}

const customTimeslotsApi = new CustomTimeslots();
export default customTimeslotsApi;

import axios from "@/plugins/axios/";

class DefaultTimeslots {
  async createDefaultTimeslot(timeslot) {
    const data = {
      weekday: timeslot.weekday,
      start_at: timeslot.start_at,
      end_at: timeslot.end_at,
      session_id: sessionId
    };

    const response = await axios.post(
      `/timeslots/create-default-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }

  async fetchDefaultTimeslots() {
    const response = await axios.get(`/timeslots/read-default-timeslot.php`);
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
      `/timeslots/update-default-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }

  async deleteTimeslot(id) {
    const data = {
      id: id,
      session_id: sessionId
    };
    const response = await axios.post(
      `/timeslots/delete-default-timeslot.php`,
      JSON.stringify(data)
    );
    return response;
  }
}

const defaultTimeslotsApi = new DefaultTimeslots();
export default defaultTimeslotsApi;

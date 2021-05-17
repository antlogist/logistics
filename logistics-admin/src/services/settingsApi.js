import axios from "@/plugins/axios/";

class Settings {
  async fetchSettings() {
    const response = await axios.get(`/settings/read-settings.php`);
    return response;
  }

  async updateSettings(setting) {
    const data = {
      name: setting.name,
      value: setting.value,
      session_id: sessionId
    };

    console.log(data);
    const response = await axios.post(
      `/settings/update-settings.php`,
      JSON.stringify(data)
    );
    return response;
  }
}

const settingsApi = new Settings();
export default settingsApi;

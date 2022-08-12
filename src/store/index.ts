import { createStore } from 'vuex';
import axios from 'axios';

const widgets: object[] = [];

export default createStore({
  state: {
    widgets: widgets,
    loading: false
  },
  getters: {
    getWidgets(state) {
      return state.widgets;
    },

    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    addWidget(state, data) {
      state.widgets.push(data);
    },

    removeWidget(state, index) {
      state.widgets.splice(index, 1);
    },

    setLoading(state, value) {
      state.loading = value;
    },

    updateWidgetsList(state) {
      const ls = localStorage.getItem("widgets");
      state.widgets = ls !== null ? JSON.parse(ls) : [];
    },
  },
  actions: {
    addWidgetsInLocalStorage({commit}: any, widgets: object[]) {
      localStorage.setItem("widgets", JSON.stringify(widgets));
      commit("updateWidgetsList");
    },

    async fetchWeatherData({commit}: any, data: {city: string, units: string}): Promise<void> {
      commit("setLoading", true);
      const appId = "8ffde7e400ad84c17480c7b9900bf7e3";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + data.city + "&units=" + data.units + "&appid=" + appId;
      let widget;
      let viewUnits = '';
      switch (data.units) {
        case "metric":
          viewUnits = "°C";
          break;
        case "imperial":
          viewUnits = "°F";
          break;
        case "standard":
          viewUnits = "K";
          break;
      }
      try {
        await axios.get(url).then((response) => {
          widget = {
            id: response.data.id,
            cityName: response.data.name,
            weatherIcon: response.data.weather[0].icon,
            description: response.data.weather[0].description,
            temp: Math.round(response.data.main.temp),
            feelsLike: Math.round(response.data.main.feels_like),
            humidity: response.data.main.humidity,
            hpa: response.data.main.pressure,
            visibility: response.data.visibility / 1000,
            wind: response.data.wind.speed,
            country: response.data.sys.country,
            clouds: response.data.clouds.all,
            viewUnits
          };
          commit("addWidget", widget);
        }).catch((e) => {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }  finally {
        commit("setLoading", false);
      }
    },

    async fetchWeatherByIp(): Promise<any> {
      try {
        return await axios.get("https://api.ipify.org?format=json").then(async (response) => {
          return await axios.get("http://ip-api.com/json/" + response.data.ip).then((response) => {
            return response.data.city;
          }).catch((e) => {
            console.log(e);
          });
        }).catch((e) => {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})

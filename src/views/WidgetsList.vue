<template>
  <settings-popup :widgets="widgets" v-if="showModal" @create="createWidget" @closeSettings="showModal = false"/>
  <div class="WidgetsList__title"><h6>Today's weather forecast</h6></div>
  <div class="WidgetsList" v-if="widgets.length > 0">
    <div v-for="widget in widgets" :key="widget.id">
      <weather-widget :widget="widget" @openSettings="openSettings"/>
    </div>
  </div>
  <div class="WidgetsList__empty" v-else>
    <div>You don't have weather widgets...</div>
    <button class="WidgetsList__addButton" @click="openSettings">Add?</button>
  </div>
</template>

<script>
import WeatherWidget from "@/components/WeatherWidget/WeatherWidget";
import SettingsPopup from "@/components/SettingsPopup/SettingsPopup";
import {mapGetters} from "vuex";

export default {
  components: {
    WeatherWidget,
    SettingsPopup
  },
  computed: {
    ...mapGetters({
      widgets: "getWidgets"
    })
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    openSettings() {
      this.showModal = true;
      this.$emit("openSettings");
    },

    createWidget(city, units) {
      this.$store.dispatch("fetchWeatherData", {city, units}).then(() => {
        this.$store.dispatch("addWidgetsInLocalStorage", this.widgets);
      });
    }
  },
  mounted() {
    this.$store.commit("updateWidgetsList");
    if (!this.widgets.length) {
      this.$store.dispatch("fetchWeatherByIp").then((response) => {
        this.createWidget(response,'metric');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.WidgetsList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.WidgetsList__title {
  text-align: center;
  font-size: 90px;
  color: #ffffff;
  margin: 0 8px 8px 8px;
  background: #000000d1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 8px
}

.WidgetsList__empty {
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 20px;
  color: #ffffff;
  background: #000000d1;
  border-radius: 15px;
  margin: 16px 8px;
  padding: 8px;
}

.WidgetsList__addButton {
  padding: 12px 20px;
  border-radius: 4px;
  border: 0;
  font-size: 15px;
  margin: 12px 0;
  width: 270px;
}
</style>
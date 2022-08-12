<template>
  <settings-popup :widgets="widgets" v-if="showModal" @create="createWidget" @closeSettings="showModal = false"/>
  <div class="WidgetsList" v-if="widgets.length > 0">
    <div v-for="widget in widgets" :key="widget.id">
      <weather-widget :widget="widget" @openSettings="openSettings"/>
    </div>
  </div>
  <div v-else>
    You don't have widgets...
    <button @click="openSettings">Add?</button>
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
}
</style>
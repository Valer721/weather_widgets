<template>
  <transition name="settings">
    <div class="settingsPopup__mask">
      <div class="settingsPopup__body">
        <div class="settingsPopup__title">
          <h3>Widgets settings</h3>
          <svg class="settingsPopup__icon" viewBox="0 0 371.23 371.23" @click="close()">
            <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23 185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "/>
          </svg>
        </div>
        <div class="settingsPopup__list" @dragover.prevent>
          <div v-for="widget in widgets"
               :key="widget.id"
               draggable="true"
               @dragstart="dragHandler($event, widget)"
               @drop="dropHandler($event, widget)">
            <div class="settingsPopup__list_item">
              <div class="settingsPopup__icon">
                <svg viewBox="0 0 16 16">
                  <path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z" />
                </svg>
              </div>
              <div class="settingsPopup__list_item_text">{{ widget.cityName }}, {{ widget.country }}</div>
              <div class="settingsPopup__icon" @click="removeWidget(widget)">
                <svg viewBox="0 0 315 315">
                  <g>
                    <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                    <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                    <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                    <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="createWidget()">
          <div class="settingsPopup__form">
            <h3>Add new widget</h3>
            <input
                class="settingsPopup__input"
                type="text"
                list="countriesList"
                placeholder="Сhoose country name"
                v-model="selectedCountry"
                :tabindex="1"
                @change="onCountryChange"
            >
            <dataList id="countriesList">
              <option v-for="country in countries"
                      v-bind:value="country"
                      :key="country">
                {{country}}
              </option>
            </dataList>
            <input
                v-if="selectedCountry"
                class="settingsPopup__input"
                type="text"
                list="citiesList"
                placeholder="Сhoose city name"
                :tabindex="2"
                v-model="selectedCity"
            >
            <dataList id="citiesList">
              <option v-for="city in cities"
                      v-bind:value="city"
                      :key="city">
                {{city}}
              </option>
            </dataList>
            <div class="settingsPopup__radioBlock">
              <input
                  class="settingsPopup__radioButton"
                  type="radio"
                  id="1"
                  value="standard"
                  v-model="units"
                  checked="checked"
              >
              <label class="settingsPopup__radioLabel" for="1">K</label>
              <input
                  class="settingsPopup__radioButton"
                  type="radio"
                  id="2"
                  value="metric"
                  v-model="units"
              >
              <label class="settingsPopup__radioLabel" for="2">°C</label>
              <input
                  class="settingsPopup__radioButton"
                  type="radio"
                  id="3"
                  value="imperial"
                  v-model="units"
              >
              <label class="settingsPopup__radioLabel" for="3">°F</label>
            </div>
            <button
                class="settingsPopup__button"
                type="submit"
                :tabindex="3"
                :disabled="!selectedCountry || !selectedCity"
            >
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import countriesJson from "./countries.min.json";
import {mapGetters} from "vuex";

export default {
  props: {
    widgets: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      widgets: "getWidgets"
    })
  },
  data() {
    return {
      countriesJson: countriesJson,
      countries: [],
      cities: [],
      selectedCountry: null,
      selectedCity: null,
      units: "standard"
    }
  },
  mounted() {
    this.getCountriesList();
  },
  methods: {
    getCountriesList() {
      for (const country in this.countriesJson) {
        this.countries.push(country);
      }
    },
    onCountryChange(event) {
      this.selectedCity = "";
      this.cities = this.countriesJson[this.selectedCountry];
    },
    createWidget() {
      this.$emit("create", this.selectedCity, this.units);
      this.$emit("closeSettings");
    },
    removeWidget(widget) {
      let index = this.widgets.indexOf(widget);
      let widgets = this.widgets.filter((elem) => elem.id !== widget.id);
      this.$store.commit("removeWidget", index);
      this.$store.dispatch("addWidgetsInLocalStorage", widgets);
    },
    close() {
      this.$emit("closeSettings");
    },
    dragHandler(event, widget) {
      let dragIndex = this.widgets.indexOf(widget);
      event.dataTransfer.setData("dragIndex", dragIndex);
    },
    dropHandler(event, widget) {
      let dropIndex = this.widgets.indexOf(widget);
      let dragIndex = Number(event.dataTransfer.getData("dragIndex"));
      let updatedWidgets = this.widgets;
      let swappedWidget = updatedWidgets[dragIndex];
      updatedWidgets[dragIndex] = updatedWidgets[dropIndex];
      updatedWidgets[dropIndex] = swappedWidget;
      this.$store.dispatch("addWidgetsInLocalStorage", updatedWidgets);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "SettingsPopup";
</style>
import * as history from "./history.js";
import { slugify } from "./helpers.js";

const JSON_PATH = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=categorie%20%3D%20%27Bibliotheek%27&outFields=*&outSR=4326&f=json";
// const JSON_PATH = "https://rogerthat.be/api/libraries.json";

const app = {
  init() {
    this.libraries = [];
    this.activeLibrary = null;

    this.cacheElements();
    this.registerListeners();

    this.fetchLibraries();
  },
  cacheElements() {
    this.$navigation = document.querySelector("#navigation");
    this.$library = document.querySelector("#library");
  },
  registerListeners() {
    this.$navigation.addEventListener("click", (e) => {
      e.preventDefault();
    });

    window.addEventListener("popstate", (e) => {});
  },
  async fetchLibraries() {
    const response = await fetch(JSON_PATH);
    const data = await response.json();

    // fill up the array

    // create navigation

    // set active library and replace history
  },
  setActiveLibrary(id) {},
  addToHistory(isPush) {
    // push or replace to history
    isPush ? history.add({}) : history.replace({});
  },
  createNavigation() {
    // create HTML navigation
  },
  showLibrary() {
    // 1. set active anchor tag
    // 2. create HTML library
  },
};

app.init();

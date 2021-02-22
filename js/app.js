import * as history from "./history.js";
import { slugify } from "./helpers.js";

const JSON_PATH =
  "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=categorie%20%3D%20%27Bibliotheek%27&outFields=*&outSR=4326&f=json";
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
      this.setActiveLibrary(e.target.dataset.id);
      this.addToHistory(true);
    });

    window.addEventListener("popstate", (e) => {
      this.setActiveLibrary(e.state.id);
    });
  },
  async fetchLibraries() {
    const response = await fetch(JSON_PATH);
    const data = await response.json();

    // fill up the array
    this.libraries = data.features;

    // create navigation
    this.createNavigation();

    // set active library and replace history
    this.setActiveLibrary(null);
    this.addToHistory(false);
  },
  setActiveLibrary(id) {
    // if new visitor
    if (!this.activeLibrary || id == null) {
      this.activeLibrary = this.libraries[0];
    } else {
      // set active library to selected library
      this.activeLibrary = this.libraries.filter((value) => {
        if (value.attributes.GISID == id) return value;
      })[0];
    }

    this.showLibrary();
  },
  addToHistory(isPush) {
    // get library data
    const lib = this.activeLibrary.attributes;

    // make data object for state
    const data = {
      link: slugify(lib.naam),
      title: lib.naam,
      id: lib.GISID,
    };

    // push or replace to history
    isPush ? history.add(data) : history.replace(data);
  },
  createNavigation() {
    const anchorTags = this.libraries.map((value) => {
      const name = value.attributes.naam;
      const id = value.attributes.GISID;
      return `<a data-id="${id}" data-title=${name} href="${name
        .split(" ")
        .join("-")
        .toLowerCase()}">${name}</a>`;
    });
    this.$navigation.innerHTML = anchorTags.join("");
  },
  showLibrary() {
    // get library data
    const lib = this.activeLibrary.attributes;

    // set active link in navigation
    document.querySelectorAll("aside nav a").forEach((anchortag) => {
      anchortag.className = anchortag.dataset.id === lib.GISID ? "active" : "";
    });

    // create all HTML library info
    const libraryContent = `
    <h1>${lib.naam}</h1>
        <address>
          ${lib.straat} ${lib.huisnr}<br />
          ${lib.postcode} ${lib.gemeente}
        </address>
        <hr />
        ${
          lib.email
            ? '<a href="mailto:' + lib.email + '">' + lib.email + "</a><br>"
            : ""
        }
        ${
          lib.telefoon
            ? '<a href="tel:' + lib.telefoon + '">' + lib.telefoon + "</a><br>"
            : ""
        }
        ${
          lib.link
            ? '<a href="' + lib.link + '" target="_blank">' + lib.link + "</a>"
            : ""
        }
    `;
    this.$library.innerHTML = libraryContent;
  },
};

app.init();

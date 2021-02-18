# Libraries In Antwerp

Voor deze oefening heb je kennis van DOM, Fetch API, History API nodig.

Net zoals Open Data Gent, heeft ook stad Antwerpen een [open databank](https://www.antwerpen.be/nl/overzicht/open-data/over-opendata).

Daar kan je ondermeer alle bibliotheken ophalen uit de stad

```js
const JSON_PATH = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek4/MapServer/292/query?where=categorie%20%3D%20%27Bibliotheek%27&outFields=*&outSR=4326&f=json";
// alternatief indien Antwerp Open Data API traag gaat
const JSON_PATH_ALTERNATE = "https://rogerthat.be/api/libraries.json";
```

![Drag and Drop](./.assets/library-app.png?raw=true)

Maak een webpagina waarbij je een eenvoudige navigatie maakt met daarnaast alle verstrekte, nuttige informatie over die bibliotheek.
Zorg er tevens ook voor dat de `Vorige` en `Volgende` knoppen van de browser werken en dat die dan ook meteen de juiste bibliotheek tonen.

[Bekijk de screencast op youtube](https://www.youtube.com/embed/JfmafTkfx_Q)

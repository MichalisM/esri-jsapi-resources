import './style.css'

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as intl from "@arcgis/core/intl";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import Recenter from './widget';
import esriConfig from "@arcgis/core/config";

esriConfig.assetsPath = "./core/assets";
setAssetPath(`${location.origin}/calcite/assets`);

intl.registerMessageBundleLoader(
  intl.createJSONLoader({
    pattern: "my-application/", // The pattern is used to match the string in `intl.fetchMessageBundle("my-application/translations/MyBundle")`
    base: "my-application", // This removes the base, ie. "translations/MyBundle"
      location: new URL("./translations/", window.location.href),
  })
);

const map = new ArcGISMap({
  basemap: "streets-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12 
});

view.when(() => {
  console.log("Map is loaded");

  // Demonstrate using different locales.
  // Locale strings are set under /assets/t9n/
  const localeBtn = document.createElement("button");
  localeBtn.innerText = "Set locale to French";
  view.ui.add(localeBtn, "top-right");  
  localeBtn.addEventListener("click", () => {
    intl.getLocale() === "fr" ? intl.setLocale("en") : intl.setLocale("fr");
    localeBtn.innerText === "Set locale to English" ? localeBtn.innerText = "Set locale to French" : localeBtn.innerText = "Set locale to English";
  });  

  // Initialize the custom widget and set its properties using the constructor
  const recenterWidget = new Recenter({
    view,
    initialCenter: [-100.33, 43.69]
  });
  view.ui.add(recenterWidget, "top-right");  
});

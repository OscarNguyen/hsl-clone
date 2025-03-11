import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "../styles/index.module.scss";
import { Modes } from "../types";
import { markerColors, modeColors } from "../styles/color";
import { ROUTE_LAYER_PREFIX, ROUTE_PREFIX } from "../constants";

// Computed section
const identifier = (pattern: any) => {
  return pattern.semanticHash + pattern.name;
};

const useMapBox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [filter, setFilter] = useState(Modes.NONE);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  // Functions section
  const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
    // Allow only 2 coordinates for now.
    // If 2 coordinates are already set, remove them
    if (coordinates.length === 2) {
      removeMarkersAndCoordinates();
    } else {
      // Add a new coordinate to the coordinates array
      setCoordinates((prev) => [
        ...prev,
        { lat: e.lngLat.lat, lng: e.lngLat.lng },
      ]);
    }
  };

  const removeMarkers = () => {
    // Remove all markers
    markers.forEach((marker) => {
      marker.remove();
    });

    // Remove all markers from the markers array
    setMarkers([]);
  };

  const removeMarkersAndCoordinates = () => {
    setCoordinates([]);
    removeMarkers();
  };

  const handleFilter = (event: React.MouseEvent<HTMLElement>) => {
    // get all layers and sources
    const layers = mapRef.current?.getStyle()?.layers;
    const sources = mapRef.current?.getStyle()?.sources;

    // remove all layers and sources that start with "route"
    layers?.forEach((layer) => {
      if (
        typeof layer.id === "string" &&
        layer.id.startsWith(ROUTE_LAYER_PREFIX)
      ) {
        mapRef.current?.removeLayer(layer.id);
      }
    });

    // remove all sources that start with "route"
    Object.keys(sources || {}).forEach((sourceId) => {
      if (sourceId.startsWith(ROUTE_PREFIX)) {
        mapRef.current?.removeSource(sourceId);
      }
    });

    // set the filter
    setFilter(event.currentTarget.textContent as Modes);

    // close the filter menu
    setOpenFilterMenu(false);
  };

  const getCoordinates = (pattern: any) => {
    const coordinates = pattern.geometry.map((item: any) => [
      item.lon,
      item.lat,
    ]);

    return coordinates;
  };

  // Draw 2 back and forth routes of each type of vehicle
  const addRoute = (route: any) => {
    const pattern1 = route.patterns[0];
    const pattern2 = route.patterns[1];

    if (!pattern1 || !pattern2) return;

    const coordinates1 = getCoordinates(pattern1);
    const coordinates2 = getCoordinates(pattern2);

    const layer1Id = ROUTE_LAYER_PREFIX + identifier(pattern1);
    const layer2Id = ROUTE_LAYER_PREFIX + identifier(pattern2);
    const source1Id = ROUTE_PREFIX + identifier(pattern1);
    const source2Id = ROUTE_PREFIX + identifier(pattern2);

    const mappedData = [
      // direction 1
      { sourceId: source1Id, coordinates: coordinates1, layerId: layer1Id },
      // direction 2
      { sourceId: source2Id, coordinates: coordinates2, layerId: layer2Id },
    ];

    let lineColor = "";
    switch (route.mode) {
      case Modes.BUS:
        lineColor = modeColors.bus;
        break;
      case Modes.TRAM:
        lineColor = modeColors.tram;
        break;
      case Modes.RAIL:
        lineColor = modeColors.rail;
        break;
      case Modes.SUBWAY:
        lineColor = modeColors.subway;
        break;
      case Modes.FERRY:
        lineColor = modeColors.ferry;
        break;
      default:
        lineColor = modeColors.default;
        break;
    }

    mappedData.forEach((data) => {
      // remove the layer if it exists
      if (mapRef.current?.getLayer(data.layerId)) {
        mapRef.current?.removeLayer(data.layerId);
      }

      if (mapRef.current?.getSource(data.sourceId)) {
        mapRef.current?.removeSource(data.sourceId);
      }

      // add the source
      mapRef.current?.addSource(data.sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            title: "route",
          },
          geometry: {
            type: "LineString",
            coordinates: data.coordinates,
          },
        },
      });

      // add the layer following the source
      mapRef.current?.addLayer({
        id: data.layerId,
        type: "line",
        source: data.sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": lineColor,
          "line-width": 3,
          "line-opacity": 1,
        },
      });
    });
  };

  // UseEffect section
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [25, 60.2], // starting position [lng, lat] of Helsinki
      zoom: 9, // starting zoom
    });

    // Initialize a geolocate control
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      showAccuracyCircle: true,
      showUserLocation: true,
      trackUserLocation: true,
      showUserHeading: true,
    });

    // add geolocate control to the map on top left
    mapRef.current.addControl(geolocateControl, "top-left");

    // add navigation control to the map on top right
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current?.on("load", () => {
      if (mapRef.current) {
        // loaded property is not reliable, so we need to use a custom property
        mapRef.current.mapLoaded = true;
      }
    });

    // add click event to the map
    mapRef.current?.on("click", handleMapClick);

    return () => {
      // remove map on unmount
      mapRef.current?.remove();

      // remove click event on unmount
      mapRef.current?.off("click", handleMapClick);
    };
  }, []);

  useEffect(() => {
    // Draw markers on the map
    coordinates.forEach((coordinate, index) => {
      // Remove current markers before drawing new ones
      markers.forEach((marker) => {
        marker.remove();
      });

      // Create a new marker element
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor =
        index === 0 ? markerColors.origin : markerColors.destination;
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      // Create a new marker instance
      const marker = new mapboxgl.Marker(el)
        .setLngLat([coordinate.lng, coordinate.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
            "<div class=" +
              styles["markerText"] +
              ">" +
              (index === 0 ? "Origin" : "Destination") +
              " [" +
              coordinate?.lng.toFixed(2) +
              "," +
              coordinate?.lat.toFixed(2) +
              "]" +
              "</div>"
          )
        )
        .addTo(mapRef.current!);

      // Add the marker to the markers array
      setMarkers((prev) => [...prev, marker]);
    });
  }, [coordinates]);

  return {
    mapContainerRef,
    mapRef,
    coordinates,
    markers,
    removeMarkersAndCoordinates,
    filter,
    openFilterMenu,
    handleFilter,
    setCoordinates,
    setMarkers,
    setFilter,
    setOpenFilterMenu,
    addRoute,
  };
};

export default useMapBox;

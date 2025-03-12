import React, { useEffect, useState } from "react";
import { Button, MenuItem, Menu, Typography, Toolbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "../styles/index.module.scss";
import { Modes, mapHookProps, getRoutesQueryProps } from "../types";

// Constants section
const filterValues = [
  Modes.BUS,
  Modes.TRAM,
  Modes.RAIL,
  Modes.SUBWAY,
  Modes.FERRY,
  Modes.NONE,
];

const CustomToolbar = ({
  mapHookProps,
  getRoutesQueryProps,
}: {
  mapHookProps: mapHookProps;
  getRoutesQueryProps: getRoutesQueryProps;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { getRoutesQuery, routesData, routesLoading } = getRoutesQueryProps;
  const {
    removeMarkersAndCoordinates,
    filter,
    openFilterMenu,
    handleFilter,
    setOpenFilterMenu,
    mapContainerRef,
    mapLoaded,
    addRoute,
    markers,
  } = mapHookProps;

  const onClickRemoveAllMarkers = () => {
    removeMarkersAndCoordinates();
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
    setOpenFilterMenu(false);
  };

  const onClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenFilterMenu(true);
  };

  useEffect(() => {
    // when the map is loaded, fetch routes data
    if (mapLoaded() && !routesData && !routesLoading) {
      getRoutesQuery({ variables: { lang: "en" } });
    }
  }, [mapLoaded, routesData, routesLoading, getRoutesQuery]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapLoaded()) {
      // If the filter is NONE, do nothing
      if (filter === Modes.NONE) return;

      if (routesData && !routesLoading) {
        routesData.routes
          .filter((route: any) => {
            // Filter routes by mode
            return route.mode === filter;
          })
          .forEach((route: any) => {
            // Add routes to the map
            addRoute(route);
          });
      }
    }
  }, [routesData, routesLoading, filter]);

  return (
    <Toolbar className={styles.toolbar}>
      {/* Rendering button to filter routes by mode */}
      <Button
        className={styles.filterButton}
        variant="contained"
        onClick={onClickFilter}
        disabled={routesLoading}
      >
        <FilterAltIcon />
        <Typography>Filter route by</Typography>
      </Button>

      {/* Rendering button to remove all navigation markers */}
      <Button
        className={styles.filterButton}
        variant="contained"
        color="error"
        onClick={onClickRemoveAllMarkers}
        disabled={markers.length === 0}
      >
        <DeleteIcon />
        <Typography>Remove all navigation markers</Typography>
      </Button>

      {/* Rendering filter menu */}
      <Menu anchorEl={anchorEl} open={openFilterMenu} onClose={closeFilterMenu}>
        {filterValues.map((value) => (
          <MenuItem
            selected={filter.length > 0 && filter === value}
            key={value}
            onClick={handleFilter}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
};

export default CustomToolbar;

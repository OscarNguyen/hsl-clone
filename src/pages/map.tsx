import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { getAlerts, getRoutes, getPlanConnection } from "../graphQL/query";
import {
  Box,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  AlertColor,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "../styles/index.module.scss";
import { formatTimestamp } from "../Utils";
import { AlertType, Modes, ModesTranslation } from "../types";
import CustomCircularProgress from "../components/CustomCircularProgress";
import useMapBox from "../hooks/useMapBox";

// Constants section
const filterValues = [
  Modes.BUS,
  Modes.TRAM,
  Modes.RAIL,
  Modes.SUBWAY,
  Modes.FERRY,
  Modes.NONE,
];

// Computed section
const getModeAndRoute = (leg: any) => {
  if (leg.mode === Modes.WALK) {
    return `${ModesTranslation[leg.mode]}`;
  }
  return `${ModesTranslation[leg.mode]} ${leg.route?.shortName} from ${leg.headsign}`;
};

export default function MapPage() {
  const { data: alertsData } = useQuery(getAlerts, {
    // Refetch alerts every minute for demo purposes
    // in real life, it should be refetched in a longer interval
    pollInterval: 60000,
  });

  // Fetch routes data in need
  const [getRoutesQuery, { data: routesData, loading: routesLoading }] =
    useLazyQuery(getRoutes, {
      // Set language to English
      variables: { lang: "en" },
      // Don't refetch routes data automatically
      pollInterval: 0,
    });

  // Fetch plan connection data in need
  const [
    getPlanConnectionQuery,
    { data: planConnectionData, loading: planConnectionLoading },
  ] = useLazyQuery(getPlanConnection, {
    // Don't refetch plan connection data automatically
    pollInterval: 0,
  });

  const [shownAlert, setShownAlert] = useState<AlertType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertList, setAlertList] = useState<AlertType[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    mapContainerRef,
    coordinates,
    removeMarkersAndCoordinates,
    filter,
    openFilterMenu,
    handleFilter,
    addRoute,
    setOpenFilterMenu,
    mapLoaded,
  } = useMapBox();

  // Functions section
  const onClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenFilterMenu(true);
  };

  const onClickRemoveAllMarkers = () => {
    removeMarkersAndCoordinates();
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
    setOpenFilterMenu(false);
  };

  const closePlanConnectionDialog = () => {
    removeMarkersAndCoordinates();
    setOpenDialog(false);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  // UseEffects section
  useEffect(() => {
    // when the map is loaded, fetch routes data
    if (mapLoaded) {
      getRoutesQuery({ variables: { lang: "en" } });
    }
  }, [mapLoaded]);

  useEffect(() => {
    // when the 2 coordinates are set, fetch plan connection data
    if (coordinates.length === 2) {
      getPlanConnectionQuery({
        variables: {
          originLong: coordinates[0].lng,
          originLat: coordinates[0].lat,
          destinationLong: coordinates[1].lng,
          destinationLat: coordinates[1].lat,
        },
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapLoaded) {
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

  useEffect(() => {
    // When the plan connection data between 2 coordinates is loaded, open the dialog
    // to show the plan connection details
    if (planConnectionData) {
      setOpenDialog(true);
    }
  }, [planConnectionData]);

  useEffect(() => {
    // When the alerts data is loaded, set the alert list
    if (alertsData?.alerts.length > 0) {
      setAlertList(alertsData.alerts);
    }
  }, [alertsData]);

  useEffect(() => {
    let timeout: number | undefined;

    if (alertsData && alertList.length > 0 && !openAlert) {
      // Set the first alert to the shown alert
      // and remove it from the alert list after 1 second
      timeout = setTimeout(() => {
        setOpenAlert(true);
        setShownAlert(alertList[0]);
        setAlertList(alertList.slice(1));
      }, 1000);
    }

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [alertsData, alertList, openAlert]);

  return (
    <Box className={styles.mapPageContainer}>
      <Toolbar className={styles.toolbar}>
        {/* Rendering button to filter routes by mode */}
        <Button
          className={styles.filterButton}
          variant="contained"
          onClick={onClickFilter}
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
        >
          <DeleteIcon />
          <Typography>Remove all navigation markers</Typography>
        </Button>

        {/* Rendering filter menu */}
        <Menu
          anchorEl={anchorEl}
          open={openFilterMenu}
          onClose={closeFilterMenu}
        >
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

      {/* Rendering loading indicator */}
      {routesLoading && <CustomCircularProgress />}
      {!mapLoaded && <CustomCircularProgress />}

      {/* Rendering map */}
      <Box ref={mapContainerRef} className={styles.mapContainer} />

      {/* Rendering plan connection dialog */}
      {planConnectionLoading ? (
        <CustomCircularProgress />
      ) : (
        <Dialog open={openDialog} onClose={closePlanConnectionDialog}>
          <DialogTitle className={styles.planConnectionDialogTitle}>
            Trip details {new Date().toLocaleDateString("en-FI")}
            <IconButton
              onClick={closePlanConnectionDialog}
              className={styles.closePlanConnectionDialogButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {planConnectionData?.planConnection.edges.length === 0 && (
              <Typography variant="body1">No plan found</Typography>
            )}

            {planConnectionData?.planConnection.edges.map(
              (
                edge: any, // TODO: handle edge type later
                edgeIndex: number
              ) => {
                return (
                  <Box key={edge.node.id}>
                    <Typography color="info" variant="h5">
                      Plan {edgeIndex + 1}. Number of transfers:{" "}
                      {edge.node.numberOfTransfers}
                      <Divider />
                    </Typography>
                    {/*!TODO: handle leg type later */}
                    {edge.node.legs.map((leg: any, index: number) => {
                      return (
                        <Box mb={2} key={index}>
                          <Typography color="warning" variant="h6">
                            Mode: {getModeAndRoute(leg)}
                          </Typography>

                          <Typography variant="body1">
                            {leg.from.name} - {leg.to.name} from{" "}
                            {formatTimestamp(edge.node.start)} to{" "}
                            {formatTimestamp(edge.node.end)}
                          </Typography>

                          <Typography variant="body2">
                            Scheduled time:{" "}
                            {formatTimestamp(leg.start.scheduledTime)} -{" "}
                            {formatTimestamp(leg.end.scheduledTime)}
                          </Typography>

                          <Typography variant="body2">
                            Duration: {(leg.duration / 60).toFixed(2)} minutes
                          </Typography>

                          <Typography variant="caption">
                            Emissions:{" "}
                            {edge.node.emissionsPerPerson?.co2?.toFixed(2) || 0}{" "}
                            g/person
                          </Typography>
                          <Divider />
                        </Box>
                      );
                    })}
                  </Box>
                );
              }
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Rendering snackbar notifying users about the changes in the routes */}
      {shownAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openAlert}
          onClose={closeAlert}
          autoHideDuration={6000}
        >
          <Alert
            title={shownAlert.alertHeaderText}
            severity={shownAlert.alertSeverityLevel.toLowerCase() as AlertColor}
          >
            {shownAlert.alertDescriptionText}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

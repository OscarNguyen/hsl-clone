import * as React from "react";
import { Box } from "@mui/material";

import styles from "../styles/index.module.scss";
import useMapBox from "../hooks/useMapBox";
import CustomCircularProgress from "../components/CustomCircularProgress";
import CustomToolbar from "../components/CustomToolbar";
import PlanDetailsDialog from "../components/PlanDetailsDialog";
import InformationSnackbar from "../components/InformationSnackbar";
import { getRoutes } from "../graphQL/query";
import { useLazyQuery } from "@apollo/client";
import { mapHookProps } from "../types";

export default function MapPage() {
  // Fetch routes data in need
  const [getRoutesQuery, { data: routesData, loading: routesLoading }] =
    useLazyQuery(getRoutes, {
      // Set language to English
      variables: { lang: "en" },
      // Don't refetch routes data automatically
      pollInterval: 0,
    });
  const mapHookProps = useMapBox();

  return (
    <Box className={styles.mapPageContainer}>
      <CustomToolbar
        getRoutesQueryProps={{
          getRoutesQuery,
          routesData,
          routesLoading,
        }}
        mapHookProps={mapHookProps as mapHookProps}
      />

      {/* Rendering loading indicator */}
      {routesLoading && <CustomCircularProgress />}
      {!mapHookProps.mapLoaded() && <CustomCircularProgress />}

      {/* Rendering map */}
      <Box ref={mapHookProps.mapContainerRef} className={styles.mapContainer} />

      {/* Rendering plan details dialog */}
      <PlanDetailsDialog mapHookProps={mapHookProps as mapHookProps} />

      {/* Rendering information snackbar */}
      <InformationSnackbar />
    </Box>
  );
}

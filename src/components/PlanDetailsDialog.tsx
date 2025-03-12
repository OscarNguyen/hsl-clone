import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLazyQuery } from "@apollo/client";

import CustomCircularProgress from "./CustomCircularProgress";
import styles from "../styles/index.module.scss";
import { formatTimestamp } from "../Utils";
import { Modes, mapHookProps } from "../types";
import { ModesTranslation } from "../types";
import { getPlanConnection } from "../graphQL/query";

// Computed section
const getModeAndRoute = (leg: any) => {
  if (leg.mode === Modes.WALK) {
    return `${ModesTranslation[leg.mode]}`;
  }
  return `${ModesTranslation[leg.mode]} ${leg.route?.shortName} from ${leg.headsign}`;
};

const PlanDetailsDialog = ({
  mapHookProps,
}: {
  mapHookProps: mapHookProps;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { removeMarkersAndCoordinates, coordinates } = mapHookProps;

  // Fetch plan connection data in need
  const [
    getPlanConnectionQuery,
    { data: planConnectionData, loading: planConnectionLoading },
  ] = useLazyQuery(getPlanConnection, {
    // Don't refetch plan connection data automatically
    pollInterval: 0,
  });

  const closePlanConnectionDialog = () => {
    removeMarkersAndCoordinates();
    setOpenDialog(false);
  };

  useEffect(() => {
    // When the plan connection data between 2 coordinates is loaded, open the dialog
    // to show the plan connection details
    if (planConnectionData) {
      setOpenDialog(true);
    }
  }, [planConnectionData]);

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

  return (
    <>
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
    </>
  );
};

export default PlanDetailsDialog;

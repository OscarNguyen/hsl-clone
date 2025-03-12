import React, { useEffect, useState } from "react";
import { AlertColor, Snackbar, Alert } from "@mui/material";
import { useQuery } from "@apollo/client";

import { AlertType } from "../types";
import { getAlerts } from "../graphQL/query";

const InformationSnackbar = () => {
  const { data: alertsData } = useQuery(getAlerts, {
    // Refetch alerts every minute for demo purposes
    // in real life, it should be refetched in a longer interval
    pollInterval: 60000,
  });

  const [shownAlert, setShownAlert] = useState<AlertType | null>(null);
  const [alertList, setAlertList] = useState<AlertType[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  const closeAlert = () => {
    setOpenAlert(false);
  };

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
    <>
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
    </>
  );
};

export default InformationSnackbar;

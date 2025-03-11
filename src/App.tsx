import * as React from "react";
import { Outlet } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core/AppProvider";

const NAVIGATION: Navigation = [
  {
    title: "Overview",
    icon: <DashboardIcon />,
  },
  {
    segment: "ticket",
    title: "Ticket",
    icon: <ConfirmationNumberIcon />,
  },
  {
    segment: "map",
    title: "Map",
    icon: <MapIcon />,
  },
];

const BRANDING = {
  title: "corsearch-assignment",
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}

import * as React from "react";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem, ListItemText } from "@mui/material";

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h1">Main features</Typography>
      <List>
        <ListItem divider>
          <ListItemText>
            <Link to="/ticket">
              1. Find ticket based on the zone by clicking the search bar and
              selecting the zone.
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemText>
            <Link to="/map">
              2. Find the best route from A to B by clicking the first and
              second point on the map. It then shows the details of the route
              like duration, CO2 emissions, mode of transport, destination and
              origin, scheduled time.
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemText>
            <Link to="/map">
              3. Filter out the types of traveling by clicking the filter
              button, choose the desired type and see the different colors of
              them. Next to it is the lighter shade denoting the backward
              direction.
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemText>
            <Link to="/map">
              4. See the recent alerts from HSL about the changes and deviated
              routes by checking the snackbar at the bottom of the screen which
              is updated every 6 seconds.
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}

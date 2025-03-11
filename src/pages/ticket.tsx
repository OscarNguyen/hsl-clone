import * as React from "react";
import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  CardHeader,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { getTicketTypes } from "../graphQL/query";
import styles from "../styles/index.module.scss";
import { TicketType } from "../types";

export default function TicketPage() {
  const { data: ticketTypesData, loading } = useQuery<{
    ticketTypes: TicketType[];
  }>(getTicketTypes, {});

  const [selectedTicketType, setSelectedTicketType] = React.useState<
    TicketType[]
  >([]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Autocomplete
        multiple
        options={ticketTypesData?.ticketTypes ?? []}
        getOptionLabel={(option: TicketType) => option.zones.join("")}
        renderInput={(params) => <TextField {...params} label="Find zone" />}
        onChange={(_, value) => setSelectedTicketType(value)}
      />

      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2} mt={3}>
        {selectedTicketType.length > 0 &&
          selectedTicketType.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader
                className={styles.cardHeader}
                title={
                  <Typography variant="h5">
                    Zone: {ticket?.zones.join("")}
                  </Typography>
                }
              />

              <CardContent>
                <Typography variant="body1">
                  Price: {ticket?.price} {ticket?.currency}{" "}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </>
  );
}

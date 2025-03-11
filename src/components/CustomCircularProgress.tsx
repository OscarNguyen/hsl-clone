import React from "react";
import { CircularProgress, Box } from "@mui/material";

import styles from "../styles/index.module.scss";

const CustomCircularProgress = () => (
  <Box className={styles.circularProgressContainer}>
    <CircularProgress color="info" className={styles.circularProgress} />
  </Box>
);

export default CustomCircularProgress;

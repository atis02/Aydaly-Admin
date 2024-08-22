import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Get from "./components/Get";

const index = () => {
  return (
    <Box height="100vh" overflow="scroll" width="100%">
      <Typography
        p="10px 20px"
        fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
        fontFamily="Montserrat"
        fontWeight="600"
      >
        Kategoriýalar
      </Typography>

      <Get />
    </Box>
  );
};

export default index;

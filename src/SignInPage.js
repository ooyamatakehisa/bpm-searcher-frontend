import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <Box width={1} display="flex" justifyContent="center">
      <Box width={0.8} py={10} justifyContent="center">
        <Box p={1}>
          <Typography variant="h6" color="text.secondary">
            You have to sign in so that you can access this information.
            <br />
          </Typography>
        </Box>
        <Box p={1}>
          <Typography variant="h6" color="text.secondary">
            Please click the <Button variant="contained">SIGN IN</Button> button
            in the upper right corner to sign in.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

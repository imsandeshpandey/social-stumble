import React from "react";
import { Outlet, Router } from "react-router-dom";
import { Box } from "./basic-components/base-component/Box";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header";
import Profile from "./Profile/Profile";
import UploadButton from "./Upload/UploadButton";

export default function AppLoggedIn() {
  return (
    <Box>
      <Header />

      <Outlet />

      <UploadButton />
    </Box>
  );
}

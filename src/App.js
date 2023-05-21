import { useTheme } from "@mui/material";
import React, { useEffect } from "react";

import { Box } from "./components/basic-components/base-component/Box";
import { ThemeBtn } from "./components/basic-components/button/ButtonVariants";
import { isMobile } from "./components/basic-components/typography/typography";
import Header from "./components/Header";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup";
import UploadButton from "./components/Upload/UploadButton";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Signin from "./components/Signin";
import { PrivateRoute } from "./components/PrivateRoute";
import AppLoggedIn from "./components/AppLoggedIn";
import { useAuth } from "./firebase/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import PostModal from "./components/Profile/PostModal/PostModal";
const NepaliDate = require("nepali-date");
const Months = [
  "Baisakh",
  "Jestha",
  "Ashad",
  "Shrawan",
  "Bhadra",
  "Asoj",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];
const App = () => {
  const theme = useTheme();
  const { month, day, year } = new NepaliDate(new Date());

  return (
    <Box
      minHeight="100vh"
      height="100%"
      width="100%"
      bgcolor="grey.200"
      position="relative"
    >
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <AppLoggedIn />
              </PrivateRoute>
            }
          >
            <Route path="/api/nepali-date" element={`${month}, ${day}`} />
            <Route path="/api/nepali-date/day" element={day} />
            <Route path="/api/nepali-date/year" element={year} />
             <Route path="/api/nepali-date/month" element={month} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/:username" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      {/* <PostModal postId="OgKDK1lXXsvtU0tte1EQ" /> */}
      <Box position="fixed" bottom={40} left={40}>
        <ThemeBtn small={isMobile()} />
      </Box>
    </Box>
  );
};

export default App;

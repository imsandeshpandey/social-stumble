import { Label, VisibilityOff, Visibility } from "@mui/icons-material";
import { Alert, FormControl, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import { Box } from "./basic-components/base-component/Box";
import {
  IconBtn,
  InfoBtn,
  PrimaryBtn,
} from "./basic-components/button/ButtonVariants";
import Container from "./basic-components/Container";
import Flex from "./basic-components/Flex";
import TextField from "./basic-components/InputField/Input";
import { Body, Small } from "./basic-components/typography/typography";
import Logo from "./Logo/Logo";

const emailRef = React.createRef();
const passwordRef = React.createRef();

const Signin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, signin } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log(currentUser);
    return currentUser && navigate("/");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!passwordRef.current.value || !emailRef.current.value) {
      setError("Please fill in the required details.");
    }

    try {
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="grey.200"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        py={4}
        borderRadius={theme.shape.modal}
        width="350px"
        boxShadow="z24"
        bgcolor="grey.100"
      >
        <Container>
          <Flex width="100%" mb={5} justifyContent="center" alignItems="center">
            <Box component={Logo} height="30px" />
          </Flex>
          <Flex justifyContent="center">
            <Flex
              //
              onSubmit={handleSubmit}
              gap={2}
              component="form"
              flexDirection="column"
              width="90%"
            >
              {error && (
                <Alert
                  variant="outlined"
                  onClose={() => setError(null)}
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              <TextField
                py={8}
                placeholder="Email Address"
                type="text"
                ref={emailRef}
                required
              />
              <TextField
                py={8}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                endIcon={
                  <IconBtn
                    style={{ tabIndex: "-1" }}
                    onClick={handlePasswordVisibility}
                    icon={showPassword ? <Visibility /> : <VisibilityOff />}
                  />
                }
              />

              <PrimaryBtn type="submit" disabled={loading} mt={2}>
                <Body m={0} bold color="grey.100">
                  Sign In
                </Body>
              </PrimaryBtn>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Body color="grey.500">
        Don't have an Account?
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Body bold component="span" m={0}>
            {" "}
            Create one
          </Body>
        </Link>
      </Body>
    </Box>
  );
};

export default Signin;

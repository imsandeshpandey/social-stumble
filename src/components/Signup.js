import { Label, VisibilityOff, Visibility } from "@mui/icons-material";
import { Alert, FormControl, useTheme } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import { database } from "../firebase/config";
import { Box } from "./basic-components/base-component/Box";
import { IconBtn, PrimaryBtn } from "./basic-components/button/ButtonVariants";
import Container from "./basic-components/Container";
import Flex from "./basic-components/Flex";
import TextField from "./basic-components/InputField/Input";
import { Body, Small } from "./basic-components/typography/typography";
import Logo from "./Logo/Logo";

const nameRef = React.createRef();
const usernameRef = React.createRef();
const emailRef = React.createRef();
const passwordRef = React.createRef();
const passwordConfirmRef = React.createRef();

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  let usernames = [];
  console.log(1);
  useEffect(async () => {
    const docs = await getDocs(collection(database, "users"));
    console.log(docs);
    docs.forEach((doc) => usernames.push(doc.data().username));
    console.log(usernames);
  }, []);

  useEffect(() => {
    return currentUser && navigate("/");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      !passwordRef.current.value ||
      !emailRef.current.value ||
      !passwordConfirmRef.current.value
    )
      return setError("Please fill in the required details.");

    if (usernames.includes(usernameRef.current.value))
      return setError("Username already taken.");
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match!");

    try {
      setLoading(true);
      await signup(
        nameRef.current.value,
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (err) {
      setError(err);
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
              gap={2}
              onSubmit={handleSubmit}
              component="form"
              flexDirection="column"
              required
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
                placeholder="Name"
                type="text"
                ref={nameRef}
                required
              />
              <TextField
                py={8}
                placeholder="Username"
                type="text"
                ref={usernameRef}
                required
              />
              <TextField
                py={8}
                placeholder="Email Address"
                type="email"
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
              <TextField
                ref={passwordConfirmRef}
                py={8}
                placeholder="Confirm password"
                type={showPassword ? "text" : "password"}
                endIcon={
                  <IconBtn
                    style={{ tabIndex: "-1" }}
                    onClick={handlePasswordVisibility}
                    icon={showPassword ? <Visibility /> : <VisibilityOff />}
                  />
                }
              />
              <PrimaryBtn disabled={loading} mt={2} type="submit">
                <Body m={0} bold color="grey.100">
                  Sign Up
                </Body>
              </PrimaryBtn>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Body color="grey.500">
        Already have an Account?{" "}
        <Link style={{ textDecoration: "none" }} to="/signin">
          <Body bold component="span" m={0}>
            {" "}
            Log In
          </Body>
        </Link>
      </Body>
    </Box>
  );
};

export default Signup;

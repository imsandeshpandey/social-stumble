import {
  Label,
  VisibilityOff,
  Visibility,
  UploadFile,
} from "@mui/icons-material";
import { Alert, Avatar, FormControl, useTheme } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import { database } from "../firebase/config";
import useStorage from "../firebase/useStorage";
import { Box } from "./basic-components/base-component/Box";
import { IconBtn, PrimaryBtn } from "./basic-components/button/ButtonVariants";
import Container from "./basic-components/Container";
import Flex from "./basic-components/Flex";
import TextField from "./basic-components/InputField/Input";
import { Body, Small } from "./basic-components/typography/typography";
import Logo from "./Logo/Logo";
import ProgressBar from "./Upload/ProgressBar";

const nameRef = React.createRef();
const usernameRef = React.createRef();
const emailRef = React.createRef();
const passwordRef = React.createRef();
const passwordConfirmRef = React.createRef();

const Signup = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
  });
  const acceptedFileTypes = ["image/png", "image/jpeg"];
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { uploadFile, url, progress } = useStorage();
  useEffect(() => {
    const data = acceptedFiles?.[0];
    if (data) {
      if (!acceptedFileTypes.includes(data?.type)) {
        setError("Invalid file format.");
        return;
      }
      if (data?.size > 15000000) {
        setError("Max file size is 15.00MB.");
        return;
      }
    }
    setUserPhoto(data);
    if (data) setUserPhotoURL(URL.createObjectURL(data));
  }, [acceptedFiles[0]]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  let usernames = [];
  useEffect(async () => {
    let tempArray = [];
    const docs = await getDocs(collection(database, "users"));
    docs.forEach((doc) => tempArray.push(doc.data().username));
    usernames = tempArray;
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
      userPhoto
        ? uploadFile({
            file: { file: userPhoto },
            userPhoto: true,
          })
        : await signup(
            nameRef.current.value,
            usernameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value
          );
    } catch (err) {
      setError(err);
    }
  };
  useEffect(async () => {
    if (url)
      try {
        await signup(
          nameRef.current.value,
          usernameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value,
          url
        );
        setLoading(false);
      } catch (err) {
        setError(err);
      }
  }, [url]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      style={{
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/sandesh-stumble.appspot.com/o/blender2.jpg?alt=media&token=358efdb6-0218-46e4-815a-f30653b64d7e")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        py={4}
        borderRadius={theme.shape.modal}
        width="350px"
        boxShadow="z24"
        bgcolor={`${theme.palette.grey[100]}bb`}
        sx={{ backdropFilter: "blur(20px)" }}
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
              <Flex alignItems="center" gap={2}>
                <Flex flexDirection="column" gap={2}>
                  <TextField
                    py={8}
                    placeholder="Name"
                    bgcolor={`${theme.palette.grey[100]}77`}
                    type="text"
                    ref={nameRef}
                    required
                  />
                  <TextField
                    py={8}
                    placeholder="Username"
                    bgcolor={`${theme.palette.grey[100]}77`}
                    type="text"
                    ref={usernameRef}
                    required
                  />
                </Flex>
                <Box {...getRootProps({ classname: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Box
                    component={Avatar}
                    style={{ height: 80, width: 80 }}
                    boxShadow="z16"
                    src={userPhotoURL}
                  />
                </Box>
              </Flex>
              <TextField
                bgcolor={`${theme.palette.grey[100]}77`}
                py={8}
                placeholder="Email Address"
                type="email"
                ref={emailRef}
                required
              />
              <TextField
                bgcolor={`${theme.palette.grey[100]}77`}
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
                bgcolor={`${theme.palette.grey[100]}77`}
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
              <ProgressBar progress={progress} />
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Body textShadow="0 0 10px black" color="white">
        Already have an Account?{" "}
        <Link style={{ textDecoration: "none" }} to="/signin">
          <Body color="white" bold component="span" m={0}>
            {" "}
            Log In
          </Body>
        </Link>
      </Body>
    </Box>
  );
};

export default Signup;

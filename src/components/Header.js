import {
  AddBoxOutlined,
  ExploreOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import { Avatar, Input, useTheme } from "@mui/material";
// import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import { Box } from "./basic-components/base-component/Box";
import { IconBtn, TextBtn } from "./basic-components/button/ButtonVariants";
import Container from "./basic-components/Container";
import Flex from "./basic-components/Flex";
import TextField from "./basic-components/InputField/Input";
import { themeMode } from "./basic-components/theme/theme";
import Logo from "./Logo/Logo";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const { signOut } = useAuth();
  const [value, setValue] = useState("");
  return (
    <Box width="100%" height="60px">
      <Flex
        width="100%"
        height="60px"
        position="fixed"
        bgcolor={`${theme.palette.grey[200]}bb`}
        style={{ backdropFilter: "blur(20px)" }}
        zIndex="1"
        top="0"
        left="0"
        alignItems="center"
        boxShadow="z16"
      >
        <Container>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", width: "110px" }}
            />

            <Box margin="auto" width={["150px", "200px", "250px"]}>
              <TextField
                search
                py={4}
                placeholder="Search"
                width="50px"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Box>
            <Box
              display="grid"
              gap={2}
              alignItems="center"
              gridTemplateColumns="repeat(6,1fr)"
            >
              <IconBtn
                onClick={() => navigate("/")}
                disableRipple
                activeStyles={{ boxShadow: "none" }}
                icon={<HomeOutlined />}
              />
              <IconBtn
                disableRipple
                activeStyles={{ boxShadow: "none" }}
                icon={<MessageOutlined />}
              />

              <IconBtn
                disableRipple
                activeStyles={{ boxShadow: "none" }}
                icon={<ExploreOutlined />}
              />
              <IconBtn
                disableRipple
                activeStyles={{ boxShadow: "none" }}
                icon={<FavoriteBorderOutlined />}
              />
              <Box
                onClick={() =>
                  navigate(`/${currentUser.uid}`, { replace: true })
                }
                style={{ cursor: "pointer" }}
                component={Avatar}
                src="https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg"
                ml={1}
                height="30px"
                width="30px"
              />
              <IconBtn
                disableRipple
                color="error.dark"
                activeStyles={{ boxShadow: "none" }}
                icon={<LogoutOutlined />}
                onClick={() => {
                  signOut();
                  navigate("/");
                }}
              />
            </Box>
          </Box>
        </Container>
      </Flex>
    </Box>
  );
};

export default Header;

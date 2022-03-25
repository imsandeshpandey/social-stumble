import { HomeMaxRounded, HomeOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";
import React from "react";
import { Body } from "../typography/typography";

import { Btn } from "./ButtonBase";
import {
  ErrorBtn,
  IconBtn,
  PrimaryBtn,
  SecondaryBtn,
  SuccessBtn,
  TertiaryBtn,
  TextBtn,
  InfoBtn,
  WarningBtn,
  ThemeBtn,
} from "./ButtonVariants";

export default {
  title: "Button",
  component: Btn,
};

export const Default = (p) => {
  return (
    <>
      <Btn {...p}>
        <Body gradient="linear-gradient(red,yellow)">Default</Body>
      </Btn>
      <Btn>Sandesh</Btn>
      <PrimaryBtn {...p}>Primary</PrimaryBtn>
      <SecondaryBtn {...p}>Secondary</SecondaryBtn>
      <TertiaryBtn {...p}>Tertiary</TertiaryBtn>
      <SuccessBtn {...p}>Success</SuccessBtn>
      <WarningBtn {...p}>Warning</WarningBtn>
      <ErrorBtn {...p}>Error</ErrorBtn>
      <InfoBtn {...p}>Info</InfoBtn>
      <TextBtn {...p}>Text</TextBtn>
      <IconBtn {...p} icon={<HomeOutlined />}>
        Icon
      </IconBtn>
      <ThemeBtn />
    </>
  );
};
export const Large = () => <Default large />;

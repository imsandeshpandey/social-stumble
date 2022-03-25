import { EditOutlined } from "@mui/icons-material";
import React from "react";
import { Box } from "../basic-components/base-component/Box";
import { IconBtn } from "../basic-components/button/ButtonVariants";
import { Small, Title3 } from "../basic-components/typography/typography";
import { Connections } from "./Connections";
import { PostsCount } from "./PostsCount";

const ProfileDetails = ({ name, username, postsCount }) => {
  return (
    <Box maxWidth="400px">
      <Box display="flex" justifyContent="space-between">
        <Box mb={1}>
          <Box display="flex" alignItems="center">
            <Title3 bold color="grey.900" m="0" mt={1}>
              {name}
            </Title3>
            <PostsCount ml={1} mt={1} count={postsCount} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" width="fit-content">
          <IconBtn
            disableRipple
            activeStyles={{ boxShadow: "none", color: "grey.900" }}
            icon={<EditOutlined />}
          />
        </Box>
      </Box>
      <Small m="0" mt={-1} ml="4px" color="grey.600">
        @{username}
      </Small>
      <Connections />
    </Box>
  );
};

export default ProfileDetails;

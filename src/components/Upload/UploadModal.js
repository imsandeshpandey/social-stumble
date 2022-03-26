import React, { useEffect, useState } from "react";
import { useAuth } from "../../firebase/AuthContext";
import { Box } from "../basic-components/base-component/Box";
import {
  TertiaryBtn,
  TextBtn,
} from "../basic-components/button/ButtonVariants";
import { ClearTextField } from "../basic-components/InputField/Input";
import Modal from "../basic-components/Modal/Modal";
import { Body } from "../basic-components/typography/typography";

const descriptionRef = React.createRef();
const UploadModal = (props) => {
  const [display, setDisplay] = useState("block");
  const url = URL.createObjectURL(props.file);
  const auth = useAuth();

  const handlePublish = () => {
    console.log(descriptionRef.current.value);

    props.onPublish(descriptionRef.current.value);
    setDisplay("none");
  };
  useEffect(() => {
    const publishOnEnter = (e) => {
      // Key code for Enter
      e.keyCode === 13 && handlePublish();
    };
    window.addEventListener("keydown", publishOnEnter);
    return () => window.removeEventListener("keydown", publishOnEnter);
  }, []);

  return (
    <Modal onCloseModal={props.onCloseModal} display={display}>
      <Box
        maxWidth="60vw"
        display="flex"
        jusityfyContent="center"
        flexDirection="column"
      >
        <Box minHeight={30} py={2} width="90%" mx="auto">
          <ClearTextField
            type="text"
            width="100%"
            ref={descriptionRef}
            placeholder="Write a caption..."
          />
        </Box>
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center",
            // aspectRatio: 4 / 3,
            maxWidth: "60vw",
            maxHeight: "60vh",
            minWidth: "30vw",
          }}
          src={url}
          alt=""
        />
        <Box
          display="flex"
          width="90%"
          height="70px"
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Body
            display={["none", "none", "block"]}
            flex={1}
            color="grey.500"
            fontSize={[8, 10, 12]}
          >
            {props.file.path.slice(0, 20)}...
          </Body>
          <Box
            flex={1}
            display="flex"
            gap="10px"
            justifyContent={["space-between", "space-between", "flex-end"]}
          >
            <TextBtn disableRipple onClick={props.onCloseModal}>
              Cancel
            </TextBtn>
            <TertiaryBtn
              onClick={() => {
                handlePublish();
                setDisplay("none");
              }}
            >
              Publish
            </TertiaryBtn>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;

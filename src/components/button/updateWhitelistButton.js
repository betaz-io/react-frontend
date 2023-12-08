import React, { useState } from "react";
import Countdown from "react-countdown";
import CommonButton from "./commonButton";
import toast from "react-hot-toast";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "contexts/useModal";
import { setBuyerData } from "store/slices/whitelistSlide";

const defaultCaller = process.env.REACT_APP_DEFAULT_CALLER_ADDRESS;

export default function UpdateWhitelistButton({ data }) {
  const dispatch = useDispatch();
  const { modalUpdatewhitelistVisible, setModalUpdatewhitelistVisible } =
    useModal();
  return (
    <Flex justifyContent="center">
      <CommonButton
        onClick={() => {
          dispatch(setBuyerData(data));
          setModalUpdatewhitelistVisible(true);
        }}
        text="Update"
      />
    </Flex>
  );
}

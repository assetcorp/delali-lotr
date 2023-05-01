import { Container } from "@mui/material";
import React from "react";

interface IWrapperProps {
  children?: React.ReactElement | React.ReactElement[];
}

/**
 * Use this component for general page logic. This component is meant to
 * wrap all the main page components including the header and the footer
 */
const Wrapper = ({ children }: IWrapperProps) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default Wrapper;

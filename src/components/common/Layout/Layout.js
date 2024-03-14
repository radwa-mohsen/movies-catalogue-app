import React from "react";
import Container from "@mui/material/Container";

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <main>
        <Container sx={{ marginTop: 4, marginBottom: 12 }} maxWidth="xl">
          {children}
        </Container>
      </main>
    </>
  );
};
export {Layout};
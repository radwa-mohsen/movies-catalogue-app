import { Box } from "@mui/material";

const Layout = (props) => {
  const {children} = props
  return (
    <Box><h2>Layout</h2>
      {children}
    </Box>
  )
}

export { Layout };
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .test": {
    color: "red",
  },
}));

export default StyledBox;
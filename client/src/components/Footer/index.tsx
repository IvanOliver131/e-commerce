import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  return (
    <Box marginTop="70px" padding="40px 0" bgcolor={shades.primary[500]}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            D'ROY
          </Typography>
          <Typography color={shades.secondary[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Contato
          </Typography>
          <Typography mb="30px">
            <IconButton sx={{ color: shades.secondary[100] }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: shades.secondary[100] }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: shades.secondary[100] }}>
              <Instagram />
            </IconButton>
          </Typography>
          <Typography
            mb="30px"
            sx={{ wordWrap: "break-word", color: shades.secondary[100] }}
          >
            Email: ivanoliver131@gmail.com
          </Typography>
          <Typography mb="30px" color={shades.secondary[100]}>
            (35) 9 9730-0157
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export { Footer };

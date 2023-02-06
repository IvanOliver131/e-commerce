import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Partial<Color> {
    dark?: string;
    light?: string;
  }
}

import {createMuiTheme} from "@material-ui/core";
import {grey, green, common, red, purple, yellow} from "@material-ui/core/colors";

const primary = grey[800];
const secondary = yellow[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      contrastText: primary,
    },
  },
  typography: {useNextVariants: true},
  overrides: {
    MuiLink: {
      root: {
        cursor: "pointer",
      },
    },
  },
});

export {
  theme,
  primary,
  secondary
};
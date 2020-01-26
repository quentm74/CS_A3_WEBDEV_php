import {createMuiTheme} from "@material-ui/core";
import {grey, green, common, red, purple} from "@material-ui/core/colors";

const primary = grey[800];
const secondary = purple[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      contrastText: common.white,
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
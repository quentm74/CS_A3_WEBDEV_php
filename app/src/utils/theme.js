import {createMuiTheme} from "@material-ui/core";
import {grey, green, common} from "@material-ui/core/colors";

const primary = grey[800];
const secondary = green[500];

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
});

export {
  theme,
  primary,
  secondary
};
import {createMuiTheme} from "@material-ui/core";
import {grey, green, common, red, purple, yellow} from "@material-ui/core/colors";

const primary = grey[800];
const secondary = yellow[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      light: grey[700],
      contrastText: '#fff',
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
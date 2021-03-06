import React, {useEffect} from 'react'
import {Provider, useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "./utils/theme";
import {history} from "./utils/history";
import {Switch} from "react-router";
import {ClientPerformCommand} from "./components/ClientPerformCommand/ClientPerformCommand";
import {store, persistor} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react'
import {SignIn} from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {BookSellerListBooks} from "./components/BookSellerListBooks/BookSellerListBooks";
import {BookSellerListUsers} from "./components/BookSellerListUsers/BookSellerListUsers";
import {BookSellerListCommands} from "./components/BookSellerListCommands/BookSellerListCommands";

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Switcher/>
          </ConnectedRouter>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const Switcher = () => {

  // useEffect(() => {
  //   history.push("/sign-up");
  // }, []);

  const isLoggedIn = useSelector(state => state.user.id) !== -1;
  const isBookSeller = useSelector(state => state.user.bookseller);

  let routes;
  if (!isLoggedIn) {
    routes = <DefaultRoutes/>;
  } else {
    if (isBookSeller) {
      routes = <BookSellerRoutes/>;
    } else {
      routes = <ClientRoutes/>;
    }
  }

  return (
    <Switch>
      {routes}
    </Switch>
  );
};

const DefaultRoutes = () => (
  <React.Fragment>
    <Route path="/sign-up" component={SignUp}/>
    <Route exact path="/" component={SignIn}/>
  </React.Fragment>
);

const ClientRoutes = () => (
  <React.Fragment>
    <Route exact path="/" component={ClientPerformCommand}/>
  </React.Fragment>
);

const BookSellerRoutes = () => (
  <React.Fragment>
    <Route path="/books" component={BookSellerListBooks}/>
    <Route path="/users" component={BookSellerListUsers}/>
    <Route path="/commands" component={BookSellerListCommands}/>
    <Route exact path="/" component={BookSellerListBooks}/>
  </React.Fragment>
);

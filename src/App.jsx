import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import MainTheme from "./theme/MainTheme";
import withCustomStyles from "./App.style";
import MainWrapper from "./MainWrapper";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import LiveChatLoaderProvider from "react-live-chat-loader/module/components/LiveChatLoaderProvider";

class App extends Component {
  notistackRef = React.createRef();

  render() {
    return (
      <LiveChatLoaderProvider
        providerKey={process.env.REACT_APP_INTERCOMM_ID}
        provider="intercom"
        idlePeriod={0}
      >
        <SnackbarProvider
          maxSnack={1}
          ref={this.notistackRef}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          action={key => (
            <Button
              className={this.props.classes.notistackText}
              onClick={() => this.notistackRef.current.handleDismissSnack(key)}
            >
              Dismiss
            </Button>
          )}
          classes={{
            variantInfo: this.props.classes.info
          }}
        >
          <MuiThemeProvider theme={MainTheme}>
            <Router>
              <MainWrapper />
            </Router>
          </MuiThemeProvider>
        </SnackbarProvider>
      </LiveChatLoaderProvider>
    );
  }
}

export default withCustomStyles(App);

import React, { Component } from "react";
import { AppState } from "react-native";
import type { EventSubscription, NativeEventSubscription } from "react-native";
import { connect } from "react-redux";

const firebaseOnNotificationOpenedAppListener = null;
const firebaseOnMessageListener = null;
const appStateSub: NativeEventSubscription | null = null;
const linkingEventSub: EventSubscription | null = null;

class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRenderRequire: true,
      appState: AppState.currentState,
      foregroundNotificationData: null
    };
  }
  render() {
    const {
      isConnected,
      isDarkTheme: _isDarkTheme,
      children,
      rcOffer,
      selectedLanguage,
      toastNotification
    } = this.props;
    const { isRenderRequire, foregroundNotificationData } = this.state;

    return (
      children &&
      children({
        isConnected,
        isDarkTheme: _isDarkTheme,
        isRenderRequire,
        locale: selectedLanguage,
        rcOffer,
        toastNotification,
        foregroundNotificationData
      })
    );
  }
}

export default connect((state) => ({
  //Application
  isConnected: state.application.isConnected,
  isDarkTheme: state.application.isDarkTheme,
}));

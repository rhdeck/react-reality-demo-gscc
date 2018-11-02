import React, { Component } from "react";
import {
  ARNode,
  ARMonoView,
  ARColor,
  ARBox,
  ARButton,
  ARTrackingProvider,
  ARMeNode
} from "react-reality";
import { View, Text } from "react-native";
class componentTest extends Component {
  state = {
    buttonCount: 0,
    currentColor: "red",
    trackingLevel: "No session"
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 50,
            width: "50%",
            height: 50,
            zIndex: 1,
            backgroundColor: "yellow",
            alignContent: "center",
            flexDirection: "row"
          }}
        >
          <Text
            style={{
              alignContent: "center",
              textAlign: "center",
              textAlignVertical: "center",
              flex: 1
            }}
          >{`Tracking state: ${this.state.trackingLevel}`}</Text>
        </View>
        <ARMonoView style={{ flex: 1 }} debugMode={true} preview={true}>
          <ARTrackingProvider>
            {({ trackingLevel }) => {
              this.setState(({ trackingLevel: oldTrackingLevel }) => {
                return {
                  trackingLevel:
                    trackingLevel != oldTrackingLevel
                      ? trackingLevel
                      : oldTrackingLevel
                };
              });
              return null;
            }}
          </ARTrackingProvider>
        </ARMonoView>
      </View>
    );
  }
}
export default componentTest;

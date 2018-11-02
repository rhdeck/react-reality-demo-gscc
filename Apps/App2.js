import React, { Component } from "react";
import {
  ARNode,
  ARTouchableMonoView,
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
            zIndex: 1
          }}
        >
          <Text>{`Tracking state: ${this.state.trackingLevel}`}</Text>
        </View>
        <ARTouchableMonoView
          style={{ flex: 1 }}
          debugMode={false}
          preview={true}
        >
          <ARTrackingProvider>
            {({ trackingLevel }) => {
              console.log(trackingLevel);
              if (trackingLevel != this.state.trackingLevel)
                this.setState({ trackingLevel });

              return null;
            }}
          </ARTrackingProvider>
          <ARMeNode>
            <ARNode position={{ z: -2, y: -1 }} scale={1}>
              <ARNode position={{ x: -1 }}>
                <ARButton
                  onPress={() => {
                    this.setState(({ buttonCount }) => ({
                      buttonCount: buttonCount + 1
                    }));
                  }}
                  title={`I have been pressed ${this.state.buttonCount} times`}
                />
              </ARNode>

              <ARNode
                position={{ x: 0.5 }}
                onPressIn={() => {
                  this.setState({ currentColor: "green" });
                }}
                onPressOut={() => {
                  this.setState({ currentColor: "red" });
                }}
              >
                <ARBox>
                  <ARColor color={this.state.currentColor} />
                </ARBox>
              </ARNode>
            </ARNode>
          </ARMeNode>
        </ARTouchableMonoView>
      </View>
    );
  }
}
export default componentTest;

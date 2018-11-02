import React, { Component } from "react";
import { showImagePicker } from "react-native-image-picker";
import {
  copyAssetsFileIOS,
  DocumentDirectoryPath,
  unlink,
  exists
} from "react-native-fs";
import {
  ARNode,
  ARText,
  ARMonoView,
  ARAnimatedProvider,
  ARTrackingProvider,
  ARBox,
  ARColoredTextNode,
  ARSignNode,
  ARCenteredSKLabel,
  ARPlaneScene,
  ARMeNode,
  ARColor,
  ARColoredBoxNode,
  ARPlaneNode,
  ARSign
} from "react-reality";
import { View, Button, Text, TouchableOpacity } from "react-native";

class componentTest extends Component {
  state = {
    yea: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState(({ yea }) => {
        return { yea: (yea += Math.PI) };
      });
    }, 3000);
  }
  render() {
    return [
      <ARMonoView alignment="compass" style={{ flex: 1 }}>
        <ARTrackingProvider planeDetection="both">
          {({ anchors }) => {
            let counter = 0;
            return Object.entries(anchors)
              .filter(([k, v]) => v.type == "plane")
              .map(([parentId, { plane: { height, width } }]) => (
                <ARPlaneNode
                  height={height}
                  width={width}
                  parentNode={parentId}
                  eulerAngles={{ x: Math.PI / -2 }}
                >
                  {/* <ARColor color="green" /> */}
                  <ARSign color="green" text={`plane ${counter++}`} />
                </ARPlaneNode>
              ))
              .filter(Boolean);
          }}
        </ARTrackingProvider>
      </ARMonoView>
    ];
  }
}

export default componentTest;

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
  ARPlaneNode
} from "react-reality";
import { View, Button, Text, TouchableOpacity } from "react-native";

class componentTest extends Component {
  state = {
    yea: 0,
    referenceImage: null
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
      <TouchableOpacity
        onPress={() => {
          showImagePicker({}, async ({ origURL, height, width }) => {
            // console.log("image info", r);
            const destPath = DocumentDirectoryPath + "/defaultCard.jpg";
            const doesExist = await exists(destPath);
            if (doesExist) await unlink(destPath);
            await copyAssetsFileIOS(origURL, destPath, height, width);
            this.setState({ referenceImage: destPath });
          });
        }}
        style={{
          position: "absolute",

          zIndex: 999,
          top: 50,
          left: 50
        }}
      >
        <View style={{ backgroundColor: "blue" }}>
          <Text style={{ fontSize: 30, padding: 10 }}>Pick an Image</Text>
        </View>
      </TouchableOpacity>,
      <ARMonoView alignment="compass" style={{ flex: 1 }}>
        <ARTrackingProvider
          imageDetection={!!this.state.referenceImage}
          images={{
            defaultCard: { url: this.state.referenceImage, width: 0.2 }
          }}
        >
          {({ anchors }) => {
            return [
              anchors["defaultCard"] && (
                <ARNode
                  parentNode="defaultCard"
                  eulerAngles={{ x: Math.PI / -2 }}
                  key="defaultCard"
                >
                  <ARSignNode
                    color="red"
                    position={{ y: 0 }}
                    height={anchors["defaultCard"].plane.height}
                    width={anchors["defaultCard"].plane.width}
                    eulerAngles={{
                      x: this.state.yea,
                      y: this.state.yea,
                      z: this.state.yea
                    }}
                    text="Hello"
                  />
                </ARNode>
              )
            ].filter(Boolean);
          }}
        </ARTrackingProvider>
      </ARMonoView>
    ];
  }
}

export default componentTest;

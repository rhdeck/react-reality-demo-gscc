import React, { Component } from "react";
import {
  ARNode,
  ARText,
  ARMonoView,
  ARAnimatedProvider,
  ARColoredTextNode,
  ARSignNode,
  ARCenteredSKLabel,
  ARPlaneScene,
  ARMeNode,
  ARColor,
  ARBox
} from "react-reality";
class componentTest extends Component {
  state = {
    yea: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState(({ yea }) => {
        return { yea: (yea += Math.PI) };
      });
    }, 5000);
  }
  render() {
    return (
      <ARMonoView
        alignment="compass"
        style={{ flex: 1 }}
        debugMode={true}
        preview={true}
      >
        <ARAnimatedProvider milliseconds={5000} easing="none">
          <ARMeNode>
            <ARNode position={{ y: -2 }}>
              <ARNode eulerAngles={{ y: this.state.yea }}>
                <ARNode
                  position={{ x: 2 }}
                  eulerAngles={{
                    y: this.state.yea,
                    x: this.state.yea,
                    z: this.state.yea
                  }}
                >
                  <ARBox height={0.5} width={0.5} length={0.5}>
                    <ARColor color="blue" />
                  </ARBox>
                </ARNode>
              </ARNode>
              {/*North - positive z value */}
              <ARColoredTextNode
                position={{ z: 4, x: 2 }}
                scale={0.05}
                color="red"
                text="North"
                size={10}
                depth={1}
                eulerAngles={{ y: Math.PI }}
              />
              {/*South - negative z value. Drawn with primitives */}
              <ARNode
                position={{ z: -4 }}
                eulerAngles={{
                  x: -1 * this.state.yea
                }}
                scale={0.03}
              >
                <ARText text="South" depth={2} chamfer={0.2} size={5}>
                  <ARColor color="green" />
                </ARText>
              </ARNode>
              {/* West - positive x value */}
              <ARSignNode
                color="purple"
                position={{ x: 4 }}
                text="West"
                eulerAngles={{ y: this.state.yea }}
                fontSize={150}
              />
              {/* East - negative x value. Drawn with primitives */}
              <ARNode
                eulerAngles={{ y: -1 * this.state.yea }}
                position={{ x: -4 }}
              >
                <ARPlaneScene color="red">
                  <ARCenteredSKLabel
                    text="East"
                    fontSize={150}
                    fontColor="black"
                    height={380}
                    width={380}
                  />
                </ARPlaneScene>
              </ARNode>
            </ARNode>
          </ARMeNode>
        </ARAnimatedProvider>
      </ARMonoView>
    );
  }
}
export default componentTest;

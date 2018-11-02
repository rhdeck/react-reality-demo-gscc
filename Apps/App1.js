import React, { Component } from "react";
import {
  ARNode,
  ARMonoView,
  ARAnimatedProvider,
  ARMeNode,
  ARColor,
  ARBox,
  ARSphere,
  ARColoredCylinderNode,
  ARMaterials,
  ARMaterialProperty,
  ARTexture
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
      <ARMonoView style={{ flex: 1 }} debugMode={false} preview={true}>
        <ARAnimatedProvider milliseconds={5000} easing="none">
          <ARMeNode>
            <ARNode position={{ y: -2, z: -2 }} scale={0.3}>
              <ARSphere>
                <ARColor color="green" />
              </ARSphere>
              <ARNode eulerAngles={{ y: this.state.yea }}>
                <ARNode
                  position={{ z: -2 }}
                  eulerAngles={{
                    x: this.state.yea,
                    y: this.state.yea,
                    z: this.state.yea
                  }}
                >
                  <ARBox>
                    <ARTexture path="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/05/22/15/star-wars.jpg" />
                  </ARBox>
                </ARNode>
              </ARNode>
              {/* <ARNode eulerAngles={{ z: this.state.yea }}>
                <ARColoredCylinderNode
                  position={{ x: 2 }}
                  eulerAngles={{
                    x: this.state.yea,
                    y: this.state.yea,
                    z: this.state.yea
                  }}
                  color="purple"
                />
              </ARNode> */}
            </ARNode>
          </ARMeNode>
        </ARAnimatedProvider>
      </ARMonoView>
    );
  }
}
export default componentTest;

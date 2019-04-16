import * as React from "react";
// tslint:disable-next-line:no-var-requires
const img = require('./bomberman.png');

// import img from "./bomberman.png";

/**
 * Example description
 */
class ImageExample extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div className="image-example" >
        <img src={img} alt="fail"/>
      </div>
    );
  }
}

export { ImageExample };

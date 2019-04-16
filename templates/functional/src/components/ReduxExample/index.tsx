import * as React from "react";
import { ReduxExampleProps, ReduxExampleState } from "./types";

/**
 * Example description
 */
class ReduxExample extends React.Component<ReduxExampleProps, ReduxExampleState> {
  public render(): React.ReactNode {
    return (
      <div className="redux-example" style={{color: this.props.color}} >
        <p>This is the super useful redux-powered example component!</p>
        <p>{this.props.children}</p>
        <p>
          <button onClick={this.props.handleClick}>
            Click me!
          </button>
        </p>
      </div>
    );
  }
}

export { ReduxExample, ReduxExampleProps, ReduxExampleState };

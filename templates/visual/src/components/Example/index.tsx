import * as React from "react";
import { ExampleProps, ExampleState } from "./types";

/**
 * Example description
 */
class Example extends React.Component<ExampleProps, ExampleState> {
  public render(): React.ReactNode {
    return (
      <div className="example" style={{color: this.props.color}} >
        This is the super useful example component!
      </div>
    );
  }
}

export { Example, ExampleProps, ExampleState };

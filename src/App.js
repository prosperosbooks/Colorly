import React from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

class App extends React.Component {
  render() {
    return (

        <Switch>
          <Route exact path="/" render={() => <h1>PALETTE LIST</h1>} />
          <Route exact path="/palette/:id" render={() => <h1>INDIVIDUAL PALETTE</h1>} />
        </Switch>

      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;

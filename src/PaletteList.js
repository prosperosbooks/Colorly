import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

export default class PaletteList extends Component {
  render() {
    const { seedColors } = this.props;
    return (
      <div>
        <MiniPalette />
        <h1>Colorly</h1>
        {seedColors.map(palette => (
         <MiniPalette {...palette}></MiniPalette>
        ))}
      </div>
    );
  }
}

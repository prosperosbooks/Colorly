import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import './Navbar.css'

export default class Navbar extends Component {
  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">Color Slider</a>
        </div>

        <div className="slider">
          <div className="slider-container">
            <span>Level: {level} </span>
            <Slider
              defaultValue={level}
              step={100}
              min={100}
              max={900}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      </header>
    );
  }
}

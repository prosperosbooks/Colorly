import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
      this.setState({format: e.target.value})
      this.props.changeFormat(e.target.value)
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;


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

        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

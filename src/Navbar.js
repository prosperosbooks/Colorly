import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.changeFormat(e.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
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
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>

        <div className="snackbar-container">
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={3000}
            message={
              <span id="message-id">
                Format Changed to {format.toUpperCase()}
              </span>
            }
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            onClose={this.closeSnackbar}
            action={[
              <IconButton
                onClick={this.closeSnackbar}
                color="inherit"
                key="close"
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </header>
    );
  }
}

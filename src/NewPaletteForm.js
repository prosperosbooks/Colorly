import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: '100%',
  },
  button: {
    width: '50%'
  },
  picker: {
    width: "90% !important",
    marginTop: "2rem",
    marginBottom: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
}));

export default function NewPaletteForm({ savePalette, history, palettes }) {
  const defaultProps = {
    maxColors: 20
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, createColor] = useState(palettes[0].colors);
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color }) => color !== currentColor)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [colors, currentColor, palettes]);

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };

    createColor([...colors, newColor]);
    setNewColorName("");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNameChange = e => {
    e.target.name === "newPaletteName"
      ? setNewPaletteName(e.target.value)
      : setNewColorName(e.target.value);
  };

  const clearColors = () => {
    createColor([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map(p => p.colors);

    let randomIndex = Math.floor(Math.random() * allColors.length);
    let randomColors = allColors[randomIndex];

    createColor(randomColors);
  };

  const handleSavePalette = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    savePalette(newPalette);
    history.push("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    createColor(arrayMove(colors, oldIndex, newIndex));
  };

  const handleClickDelete = colorName => {
    console.log("clicked");
    console.log(colorName);
    const updatedBoxes = colors.filter(color => color.name !== colorName);
    createColor(updatedBoxes);
  };

  const paletteIsFull = colors.length >= defaultProps.maxColors;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>

          <ValidatorForm onSubmit={handleSavePalette}>
            <TextValidator
              autoFocus
              name="newPaletteName"
              onChange={handleNameChange}
              value={newPaletteName}
              label="Palette Name"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
          </ValidatorForm>

          <Button type="submit" variant="contained" color="primary">
            Save Palette
          </Button>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "1em" }}
            >
              Go Back
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
     
        <div className={classes.container}>
        <Typography variant="h4" gutterBottom>Design Custom Palette</Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              onClick={clearColors}
              variant="contained"
              color="secondary"
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              onClick={addRandomColor}
              variant="contained"
              color="primary"
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            className={classes.picker}
            color={currentColor}
            onChangeComplete={newColor => setCurrentColor(newColor.hex)}
          />

          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator
              className={classes.colorNameInput}
              variant="filled"
              placeholder="color name"
              margin="normal"
              autoFocus
              name="newColorName"
              value={newColorName}
              onChange={handleNameChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Enter a color name",
                "Color name must be unique",
                "Color already used"
              ]}
            />

            <Button
              className={classes.addColor}
              type="submit"
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
            >
              {paletteIsFull ? "Palette is Full" : "Add Color"}
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList axis="xy" colors={colors} onSortEnd={onSortEnd} />
      </main>
    </div>
  );
}

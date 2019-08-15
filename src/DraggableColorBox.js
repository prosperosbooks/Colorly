import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.2)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out"
  }
};

const DraggableColorBox = SortableElement(props => {
  const { handleClickDelete } = props;
  const { color, name } = props.color;
  const { root, boxContent, deleteIcon } = props.classes;

  return (
    <div className={root} style={{ backgroundColor: color }}>
      <div className={boxContent}>
        <span> {name} </span>
        <DeleteForeverIcon
          onClick={handleClickDelete}
          className={deleteIcon}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);

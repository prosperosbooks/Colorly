import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
import uuid from "uuid/v4";

const DraggableColorList = SortableContainer(
    ({ colors, handleClickDelete }) => {
    
    return (
      <div style={{ height: "100%" }}>
        {colors.map((color, i) => 
        (
          <DraggableColorBox
            index={i}
            key={uuid()}
            handleClickDelete={() => handleClickDelete(color.name)}
            color={color}
          />
        ))}
      </div>
    );
  }
);

export default DraggableColorList;

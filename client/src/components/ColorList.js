import React, { useState } from "react";
import { axiosWithAuth } from '../utils/api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveNew = e => {
    e.preventDefault();
    axiosWithAuth().post('/colors', newColor)
      .then(res => {
        updateColors(res.data);
        setNewColor(initialColor);
        setAdding(false);
      })
      .catch(err => console.warn(err));
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => {
            if(colorToEdit.id === color.id) {
              return {...colorToEdit};
            }
            return {...color};
          }));
        setEditing(false);
      })
      .catch(err => console.warn(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(
          colors.filter(c => c.id !== color.id)
        );
      })
      .catch(err => console.warn(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      
      <button onClick={() => setAdding(!adding)}>Add color</button>
      {/* stretch - build another form here to add a color */}
      {adding && (
        <form onSubmit={saveNew}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

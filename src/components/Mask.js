import React, { useState } from "react"
import classes from "./Mask.module.css"

function Mask({ chooseUserMaskHandler }) {
  const [mask, setMask] = useState("Mask_1")

  const confirmMaskHandler = () => {
    switch (mask) {
      case "Mask_1":
        chooseUserMaskHandler(
          "M2.3699 88.9367C-2.11311 42.3243 34.7252 2 81.7913 2H90.0318C137.296 2 174.198 42.6479 169.404 89.4275L159.328 187.749C155.472 225.378 123.62 254 85.6014 254C47.4065 254 15.4674 225.12 11.8294 187.293L2.3699 88.9367Z"
        )
        break

      default:
        setMask("Оберіть Маску")
        break
    }
  }
  const selectMaskHandler = (event) => {
    setMask(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className={classes.box}>
      <div>
        <h3>Choose mask</h3>
      </div>
      <select
        className={classes.select}
        id="lang"
        onChange={selectMaskHandler}
        value={mask}
      >
        <option value="Mask_1">Обличчя</option>
      </select>
      <button className={classes.button} onClick={confirmMaskHandler}>
        Прийняти
      </button>
    </div>
  )
}

export default Mask

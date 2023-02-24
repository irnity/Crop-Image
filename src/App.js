import { useState } from "react"

import classes from "./app.module.css"

import Canvas from "./components/Canvas"
import ImageUpload from "./components/ImageUpload"
import Mask from "./components/Mask"

function App() {
  const [newImage, setNewImage] = useState()
  const [mask, setMask] = useState("")

  const imageHandler = (data) => {
    setNewImage(data)
  }

  const maskHandler = (data) => {
    setMask(data)
  }

  return (
    <div className={classes.app}>
      <div>
        <h1>Crop Image</h1>
      </div>
      {mask && newImage && <Canvas loadedImage={newImage} maskCrop={mask} />}
      {!mask && <Mask chooseUserMaskHandler={maskHandler} />}
      <ImageUpload imageHandler={imageHandler} />
    </div>
  )
}

export default App

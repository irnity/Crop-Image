import { useState } from "react"
import classes from "./app.module.css"
import Canvas from "./components/Canvas"
import ImageUpload from "./components/ImageUpload"

function App() {
  const [newImage, setNewImage] = useState()

  const imageHandler = (data) => {
    setNewImage(data)
  }

  return (
    <div className={classes.app}>
      <div>
        <h1>Crop Image</h1>
      </div>
      {newImage && <Canvas loadedImage={newImage} />}
      <ImageUpload imageHandler={imageHandler} />
    </div>
  )
}

export default App

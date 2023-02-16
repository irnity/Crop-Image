import { useState } from "react"
import "./App.css"
import Canvas from "./Canvas"
import CanvasPaint from "./CanvasPaint"
import ImageUpload from "./ImageUpload"

function App() {
  const [newImage, setNewImage] = useState()

  const imageHandler = (data) => {
    setNewImage(data)
  }

  return (
    <div className="App">
      <div>Hello World</div>
      {/* <CanvasPaint /> */}
      <ImageUpload imageHandler={imageHandler} />
      {newImage && <Canvas loadedImage={newImage} />}
    </div>
  )
}

export default App

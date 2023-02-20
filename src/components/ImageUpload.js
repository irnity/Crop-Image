import { useState, useEffect } from "react"
import classes from "./ImageUpload.module.css"

const ImageUpload = ({ imageHandler }) => {
  const [selectedFile, setSelectedFile] = useState()

  // side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)

    imageHandler(selectedFile)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageHandler, selectedFile])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <div className={classes.input_box}>
      <label htmlFor="input">
        <h3>Download Image</h3>
      </label>
      <input
        id="input"
        className={classes.input}
        type="file"
        onChange={onSelectFile}
      />
    </div>
  )
}

export default ImageUpload

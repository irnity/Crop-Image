import { useState } from "react"

const useDownload = (canvasRef) => {
  const [downloaded, setDownloaded] = useState(false)

  const toggleCropHandler = () => {
    setDownloaded(true)
  }

  // save image canvas
  const saveImageToLocal = (event) => {
    let link = event.currentTarget
    link.setAttribute("download", "canvas.png")
    let image = canvasRef.current.toDataURL("image/png")
    link.setAttribute("href", image)
  }

  return { downloaded, toggleCropHandler, saveImageToLocal }
}

export default useDownload

import { useState } from "react"

const useDownload = (canvasRef) => {
  const [downloaded, setDownloaded] = useState(false)

  const toggleCropHandler = () => {
    setDownloaded((prevState) => !prevState)
  }

  // save image canvas
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const saveImageToLocal = async () => {
    setDownloaded((prevState) => !prevState)

    await delay(300)

    const dataURL = canvasRef.current.toDataURL()
    const link = document.createElement("a")
    link.download = "canvas-image.png"
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    await delay(300)

    setDownloaded((prevState) => !prevState)
  }

  return { downloaded, toggleCropHandler, saveImageToLocal }
}

export default useDownload

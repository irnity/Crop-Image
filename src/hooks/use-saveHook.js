import { useState } from "react"

const useDownload = (canvasRef) => {
  const [downloaded, setDownloaded] = useState(false)
  //canvas widht and height
  const [canWid, setcanWid] = useState(330)
  const [canHei, setcanHei] = useState(330)

  const toggleCropHandler = () => {
    setDownloaded((prevState) => !prevState)
  }

  // save image canvas
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const saveImageToLocal = async () => {
    // change size of canvas
    setDownloaded((prevState) => !prevState)
    setcanWid(172)
    setcanHei(256)
    await delay(250)

    // save canvas as image
    const dataURL = canvasRef.current.toDataURL()
    const link = document.createElement("a")
    link.download = "canvas-image.png"
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // return canvas to start size
    await delay(25)
    setcanWid(330)
    setcanHei(330)
    setDownloaded((prevState) => !prevState)
  }

  return { canWid, canHei, downloaded, toggleCropHandler, saveImageToLocal }
}

export default useDownload

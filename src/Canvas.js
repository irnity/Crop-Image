import React, { useEffect, useMemo, useRef, useState } from "react"
import background from "./images/one.jpg"

function Canvas({ loadedImage }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  const [size, setSize] = useState(100)
  const [angle, setAngle] = useState(0)

  const [isDrawing, setIsDrawing] = useState(false)
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const image = useMemo(() => new Image(), [])
  image.src = URL.createObjectURL(loadedImage)

  const backImage = useMemo(() => new Image(), [])
  backImage.src = background

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 600

    ctxRef.current = ctx
    draw()
  }, [])

  const draw = useMemo(
    () =>
      function draw() {
        image.onload = () => {
          ctxRef.current.drawImage(
            backImage,
            0,
            0,
            ctxRef.current.canvas.width,
            ctxRef.current.canvas.height
          )
          ctxRef.current.save() // save the context

          ctxRef.current.rotate((angle * Math.PI) / 180)

          ctxRef.current.drawImage(image, X, Y, size, size)
          ctxRef.current.restore()
        }
      },
    [X, Y, angle, backImage, image, size]
  )

  useEffect(() => {
    draw()
  }, [draw])

  //
  const startDrawing = () => {
    setIsDrawing(true)
  }

  //

  const drawww = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    setX(offsetX - size / 2)
    setY(offsetY - size / 2)
  }

  //

  const finishDrawing = () => {
    setIsDrawing(false)
  }

  //

  const sizeHandler = (e) => {
    setSize((prevState) => (prevState = e.target.value))
  }

  const angleHandler = (e) => {
    setAngle(e.target.value)
  }

  const saveImageToLocal = (event) => {
    let link = event.currentTarget
    link.setAttribute("download", "canvas.png")
    let image = canvasRef.current.toDataURL("image/png")
    link.setAttribute("href", image)
  }

  return (
    <div>
      <div>
        <label htmlFor="volume">size {size}</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="10"
          // step="100"
          max="600"
          onChange={sizeHandler}
        />
      </div>
      <div>
        <label htmlFor="position">Position {angle}</label>
        <input
          type="range"
          id="position"
          name="position"
          min="0"
          // step="40"
          max="180"
          onChange={angleHandler}
        />
      </div>
      <canvas
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawww}
        ref={canvasRef}
      >
        Nothing?
      </canvas>
      <a
        id="download_image_link"
        href="download_link"
        onClick={saveImageToLocal}
      >
        Download Image
      </a>
    </div>
  )
}

export default Canvas

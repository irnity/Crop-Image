import React, { useEffect, useMemo, useRef, useState } from "react"
import background from "./images/one.jpg"

function Canvas({ loadedImage }) {
  // conect ref to canvas
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // size image
  const [size, setSize] = useState(200)
  const [angle, setAngle] = useState(0)

  //
  const [isDrawing, setIsDrawing] = useState(false)

  // move direction
  const [X, setX] = useState(0)
  const [olxX, setOlxX] = useState(0)

  const [Y, setY] = useState(0)
  const [olxY, setOlxY] = useState(0)

  // download image
  const image = useMemo(() => new Image(), [])
  image.src = URL.createObjectURL(loadedImage)

  const backImage = useMemo(() => new Image(), [])
  backImage.src = background

  // start Render
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 600

    ctxRef.current = ctx
    setX(ctxRef.current.canvas.width / 2.5)
    setY(ctxRef.current.canvas.height / 2.5)
    draw()
  }, [])

  // rendering image
  const draw = useMemo(
    () =>
      function draw() {
        image.onload = () => {
          // if we need background image

          // ctxRef.current.drawImage(
          //   backImage,
          //   0,
          //   0,
          //   ctxRef.current.canvas.width,
          //   ctxRef.current.canvas.height
          // )

          // fill canvas with empty space because if we
          // dont use image will render multiple time
          ctxRef.current.fillStyle = "white"
          ctxRef.current.fillRect(
            0,
            0,
            ctxRef.current.canvas.width,
            ctxRef.current.canvas.height
          )

          ctxRef.current.save()

          ctxRef.current.translate(
            ctxRef.current.canvas.width / 2,
            ctxRef.current.canvas.height / 2
          )
          ctxRef.current.rotate((Math.PI / 180) * angle)

          ctxRef.current.translate(
            -(ctxRef.current.canvas.width / 2),
            -(ctxRef.current.canvas.height / 2)
          )

          // draw main image that we insert
          ctxRef.current.drawImage(image, X, Y, size, size)

          // size of our crop
          const sizez = Math.min(
            ctxRef.current.canvas.width / 1.5,
            ctxRef.current.canvas.height / 1.5
          )

          // form of crop
          ctxRef.current.globalCompositeOperation = "destination-in"

          // draw our circle mask
          ctxRef.current.fillStyle = "#000"
          ctxRef.current.beginPath()
          ctxRef.current.arc(
            ctxRef.current.canvas.width / 2,
            ctxRef.current.canvas.height / 2,
            sizez * 0.5, // radius
            0, // start angle
            2 * Math.PI // end angle
          )
          ctxRef.current.fill()

          // restore to default composite operation (is draw over current image)
          ctxRef.current.globalCompositeOperation = "source-over"

          ctxRef.current.restore()
        }
      },
    [X, Y, angle, image, size]
  )

  // main render when we move image
  useEffect(() => {
    draw()
  }, [draw])

  // change state of moving
  const startDrawing = () => {
    setIsDrawing(true)
  }

  // move our image
  const move = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    // right
    if (offsetX > olxX) {
      setX((prevState) => prevState + 4)
      setOlxX(offsetX)
      // left
    } else if (offsetX < olxX) {
      setX((prevState) => prevState - 4)
      setOlxX(offsetX)
    }

    // up
    if (offsetY > olxY) {
      setY((prevState) => prevState + 4)
      setOlxY(offsetY)
      // down
    } else if (offsetY < olxY) {
      setY((prevState) => prevState - 4)
      setOlxY(offsetY)
    }
  }

  // change state of moving
  const finishDrawing = () => {
    setIsDrawing(false)
  }

  // change size of image
  const sizeHandler = (e) => {
    setSize((prevState) => (prevState = e.target.value))
  }

  // change angle of image if we change it move direction is changed to
  // that will make move top change to move left for example
  const angleHandler = (e) => {
    setAngle(e.target.value)
    draw()
    setX(ctxRef.current.canvas.width / 2)
    setY(ctxRef.current.canvas.height / 2)
  }

  // save image canvas
  const saveImageToLocal = (event) => {
    let link = event.currentTarget
    link.setAttribute("download", "canvas.png")
    let image = canvasRef.current.toDataURL("image/png")
    link.setAttribute("href", image)
  }

  return (
    <div>
      <div>
        <label htmlFor="volume">Scale {size}</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="200"
          // step="100"
          max="600"
          onChange={sizeHandler}
        />
      </div>
      <div>
        <label htmlFor="position">Rotate {angle}</label>
        <input
          type="range"
          id="position"
          name="position"
          min="-180"
          step="5"
          max="180"
          onChange={angleHandler}
        />
      </div>
      <canvas
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={move}
        onMouseLeave={finishDrawing}
        ref={canvasRef}
      >
        Nothing?
      </canvas>
      <div>
        <a href="download_link" onClick={saveImageToLocal}>
          Download Image
        </a>
      </div>
    </div>
  )
}

export default Canvas

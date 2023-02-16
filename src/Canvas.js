import React, { useEffect, useMemo, useRef, useState } from "react"
import background from "./images/one.jpg"

function Canvas({ loadedImage }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // size image
  const [size, setSize] = useState(100)
  const [angle, setAngle] = useState(0)

  // move direction
  const [isDrawing, setIsDrawing] = useState(false)

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
    draw()
  }, [])

  // rendering image
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

          ctxRef.current.translate(
            ctxRef.current.canvas.width / 2,
            ctxRef.current.canvas.height / 2
          ) //let's translate
          ctxRef.current.rotate((Math.PI / 180) * angle) //increment the angle and rotate the image
          ctxRef.current.translate(
            -(ctxRef.current.canvas.width / 2),
            -(ctxRef.current.canvas.height / 2)
          ) //let's translate

          ctxRef.current.drawImage(image, X, Y, size, size)
          const sizez = Math.min(image.naturalWidth, image.naturalHeight)
          // ctxRef.current.drawImage(image, 0, 0)

          // only draw image where mask is
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
    [X, Y, angle, backImage, image, size]
  )

  const cut = () => {}

  useEffect(() => {
    draw()
  }, [draw])

  // change state of moving
  const startDrawing = () => {
    setIsDrawing(true)
  }

  //

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

  //

  const sizeHandler = (e) => {
    setSize((prevState) => (prevState = e.target.value))
  }

  //

  const angleHandler = (e) => {
    setAngle(e.target.value)
    draw()
    setX(ctxRef.current.canvas.width / 4)
    setY(ctxRef.current.canvas.height / 4)
  }

  // save image by user

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
          min="-180"
          step="10"
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
      <a
        id="download_image_link"
        href="download_link"
        onClick={saveImageToLocal}
      >
        Download Image
      </a>
      <button onClick={cut}>Cut</button>
    </div>
  )
}

export default Canvas

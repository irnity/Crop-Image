import React, { useEffect, useMemo, useRef, useState } from "react"

function Canvas({ loadedImage }) {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  const [size, setSize] = useState(100)
  const [position, setPosition] = useState(0)

  const [isDrawing, setIsDrawing] = useState(false)
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  const image = useMemo(() => new Image(), [])
  const backImage = useMemo(() => new Image(), [])

  image.src = URL.createObjectURL(loadedImage)
  backImage.src = "https://i.stack.imgur.com/6V1Ky.png"

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 600

    ctxRef.current = ctx
  }, [])

  useEffect(() => {
    draw()
  }, [X, Y, size])

  function draw() {
    image.onload = () => {
      // ctxRef.current.scale(1, 1)
      // ctxRef.current.rotate((0 * Math.PI) / 180)
      ctxRef.current.fillStyle = "white"
      ctxRef.current.fillRect(0, 0, 600, 600)
      ctxRef.current.drawImage(image, X, Y, size, size)
    }
  }
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

  const positionHandler = (e) => {
    setPosition((prevState) => (prevState = e.target.value))
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
        <label htmlFor="position">Position {position}</label>
        <input
          type="range"
          id="position"
          name="position"
          min="0"
          // step="40"
          max="200"
          onChange={positionHandler}
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
    </div>
  )
}

export default Canvas

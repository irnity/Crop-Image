import React, { useEffect, useMemo, useRef, useState } from "react"

function Canvas({ loadedImage }) {
  const canvasRef = useRef(null)

  const [size, setSize] = useState(100)
  const [position, setPosition] = useState(0)

  const image = useMemo(() => new Image(), [])
  const backImage = useMemo(() => new Image(), [])

  // const image = new Image()

  image.src = URL.createObjectURL(loadedImage)
  backImage.src = "https://i.stack.imgur.com/6V1Ky.png"

  useEffect(() => {
    const canvas = canvasRef.current
    let ctx = canvas.getContext("2d")
    canvas.width = 600
    canvas.height = 600

    ctx.scale(1, 1)
    image.onload = () => {
      // ctx.fillStyle = "white"
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(backImage, 0, 0, 200, 200)
      ctx.drawImage(image, position, position, size, size)
    }
  }, [size, position])

  const sizeHandler = (e) => {
    setSize((prevState) => (prevState = e.target.value))
  }

  const positionHandler = (e) => {
    setPosition((prevState) => (prevState = e.target.value))
  }

  return (
    <div>
      <div>
        <label htmlFor="volume">Volume {size}</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="100"
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
      <canvas ref={canvasRef}>Nothing?</canvas>
    </div>
  )
}

export default Canvas

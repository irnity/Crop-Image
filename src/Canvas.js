import React, { useEffect, useMemo, useRef, useState } from "react"

function Canvas({ loadedImage }) {
  const canvasRef = useRef(null)

  const [size, setSize] = useState(100)
  const [position, setPosition] = useState(0)

  const image = useMemo(() => new Image(), [])
  const backImage = useMemo(() => new Image(), [])

  image.src = URL.createObjectURL(loadedImage)
  backImage.src = "https://i.stack.imgur.com/6V1Ky.png"

  function draw(ctx, canvas) {
    // ctx.scale(1,1)
    // повернути на 10 градусів
    image.onload = () => {
      ctx.scale(1, 1)
      ctx.rotate((0 * Math.PI) / 180)
      ctx.drawImage(
        image,
        position,
        position,
        canvas.width / 2,
        canvas.height / 2
      )

      // ctx.rotate((-10 * Math.PI) / 180)
      // // фігури
      // ctx.beginPath()
      // // moveTo здвигає 1
      // ctx.moveTo(250, 150)
      // // lineTo прокладує лінію 2
      // ctx.lineTo(350, 150)
      // // // lineTo прокладує лінію 3
      // ctx.lineTo(425, 250)
      // // // lineTo прокладує лінію 4
      // ctx.lineTo(425, 350)
      // // // lineTo прокладує лінію 5
      // ctx.lineTo(350, 450)
      // // // lineTo прокладує лінію 6
      // ctx.lineTo(250, 450)
      // // // lineTo прокладує лінію 7
      // ctx.lineTo(175, 350)
      // // // lineTo прокладує лінію 8
      // ctx.lineTo(175, 250)
      // // closePath з'єднує останню точку з першою
      // ctx.closePath()
      // // бордер
      // ctx.stroke()
      // // ctx.drawImage(backImage, 200, 200, 200, 200)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    let ctx = canvas.getContext("2d")
    canvas.width = 600
    canvas.height = 600

    // canvas.width = window.innerWidth / 2
    // canvas.height = window.innerHeight / 2

    draw(ctx, canvas)
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
      <canvas ref={canvasRef}>Nothing?</canvas>
    </div>
  )
}

export default Canvas

import React, { useEffect, useMemo, useRef } from "react"

import classes from "./Canvas.module.css"

import mask from "../images/faceMask.svg"

import useSize from "../hooks/use-sizeHook"
import useMove from "../hooks/use-moveHook"
import useOverFlow from "../hooks/use-overflowHook"
import useDownload from "../hooks/use-saveHook"
import Input from "./Input"
import DownloadButton from "./DownloadButton"
import useAngle from "../hooks/use-angleHook"

function Canvas({ loadedImage, maskCrop }) {
  // conect ref to canvas
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // size hook
  const { size, sizeHandler, sizeByWheelHandler } = useSize()
  // move hook
  const { xPosition, yPosition, startDrawing, move, finishDrawing } = useMove()
  // download hook
  const { downloaded, saveImageToLocal } = useDownload(canvasRef)
  // overflow hook
  const { scrollHandlerOn, scrollHandlerOff } = useOverFlow()
  // angle hook
  const { angle, angleHandler } = useAngle()

  // download image
  const image = useMemo(() => new Image(), [])

  // start Render
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 330
    canvas.height = 330
    ctxRef.current = ctx
  }, [downloaded])

  // rendering image
  const draw = useMemo(
    () =>
      function draw() {
        image.src = URL.createObjectURL(loadedImage)
        image.onload = () => {
          // clear canvas
          ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )

          // make crop

          if (downloaded === true) {
            let Mask = new Path2D(maskCrop)
            const position = new Path2D()
            position.addPath(Mask, {
              e: 76,
              f: 35,
            })
            ctxRef.current.clip(position)
          }

          ctxRef.current.save()

          const centerX = canvasRef.current.width / 2
          const centerY = canvasRef.current.height / 2

          // Спочатку зміщуємо зображення до центру
          ctxRef.current.translate(centerX, centerY)

          // Повертаємо зображення на заданий кут
          ctxRef.current.rotate((angle * Math.PI) / 180)
          ctxRef.current.scale(size / 1000, size / 1000)

          // Зміщуємо зображення назад
          ctxRef.current.translate(-centerX, -centerY)

          // draw main image that we insert
          ctxRef.current.drawImage(image, xPosition, yPosition)

          ctxRef.current.restore()
        }
      },
    [
      image,
      loadedImage,
      downloaded,
      angle,
      xPosition,
      yPosition,
      size,
      maskCrop,
    ]
  )

  // main render when we move image
  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div className={classes.box}>
      <div className={classes.mask_box}>
        <img src={mask} alt="Mask" className={classes.mask} />
      </div>

      <div className={classes.canvasBox}>
        <canvas
          className={classes.canvas}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={move}
          onMouseEnter={scrollHandlerOn}
          onMouseLeave={() => {
            scrollHandlerOff()
            finishDrawing()
          }}
          onWheel={sizeByWheelHandler}
          ref={canvasRef}
        >
          Nothing?
        </canvas>
      </div>

      <div className={classes.settings_box}>
        <Input
          value={size}
          handler={sizeHandler}
          name={"Scale"}
          min={200}
          max={1000}
        />
        <Input
          value={angle}
          handler={angleHandler}
          name={"Position"}
          min={-180}
          max={180}
        />
        <DownloadButton handler={saveImageToLocal} />
      </div>
    </div>
  )
}

export default Canvas

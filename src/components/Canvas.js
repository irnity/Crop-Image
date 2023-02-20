import React, { useEffect, useMemo, useRef, useState } from "react"
import classes from "./Canvas.module.css"
import mask from "../images/faceMask.svg"
import useSize from "../hooks/use-sizeHook"
import useMove from "../hooks/use-moveHook"
import useDownload from "../hooks/use-saveHook"

function Canvas({ loadedImage, maskCrop }) {
  // conect ref to canvas
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // size image
  const { size, sizeHandler, sizeByWheelHandler } = useSize()

  // moving image
  const {
    xPosition,
    yPosition,
    changePosition,
    startDrawing,
    move,
    finishDrawing,
  } = useMove()

  const { downloaded, toggleCropHandler, saveImageToLocal } =
    useDownload(canvasRef)

  const [angle, setAngle] = useState(0)

  // download image
  const image = useMemo(() => new Image(), [])

  // start Render
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 600

    ctxRef.current = ctx
    changePosition(
      canvasRef.current.width / 2.5,
      canvasRef.current.height / 2.5
    )
  }, [])

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
              e: canvasRef.current.width / 2.8,
              f: canvasRef.current.height / 3.5,
            })
            ctxRef.current.clip(position)
          }

          ctxRef.current.save()

          ctxRef.current.translate(
            canvasRef.current.width / 2,
            canvasRef.current.height / 2
          )
          ctxRef.current.rotate((Math.PI / 180) * angle)

          ctxRef.current.translate(
            -(canvasRef.current.width / 2),
            -(canvasRef.current.height / 2)
          )

          // draw main image that we insert
          ctxRef.current.drawImage(image, xPosition, yPosition, size, size)

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

  // change angle of image if we change it move direction is changed to
  // that will make move top change to move left for example
  const angleHandler = (e) => {
    setAngle(e.target.value)
    changePosition(canvasRef.current.width / 4, canvasRef.current.height / 4)
  }

  const scrollHandlerOn = () => {
    document.body.style.overflow = "hidden"
  }

  const scrollHandlerOff = () => {
    document.body.style.overflow = "auto"
  }

  //

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
        <div className={classes.setting}>
          <label className={classes.setting_input} htmlFor="volume">
            Scale
          </label>
          <input
            className={classes.setting_input}
            type="range"
            id="volume"
            name="volume"
            min="200"
            value={size}
            // step="100"
            max="1000"
            onChange={sizeHandler}
          />
        </div>
        <div className={classes.setting}>
          <label className={classes.setting_input} htmlFor="position">
            Rotate {angle}
          </label>
          <input
            className={classes.setting_input}
            type="range"
            id="position"
            name="position"
            value={angle}
            min="-180"
            step="5"
            max="180"
            onChange={angleHandler}
          />
        </div>
        {!downloaded && (
          <div className={classes.setting}>
            <button
              className={classes.setting_input}
              onClick={toggleCropHandler}
            >
              Image cut
            </button>
          </div>
        )}

        {downloaded && (
          <div className={classes.setting}>
            <a
              className={classes.download}
              href="download_link"
              onClick={saveImageToLocal}
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Canvas

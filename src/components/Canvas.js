import React, { useEffect, useMemo, useRef, useState } from "react"
import classes from "./Canvas.module.css"
import mask from "../images/faceMask.svg"

function Canvas({ loadedImage, maskCrop }) {
  // conect ref to canvas
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // size image
  const [size, setSize] = useState(200)
  const [angle, setAngle] = useState(0)

  // move direction
  const [isMouseDragging, setIsMouseDragging] = useState(false)
  const [xPosition, setXPosition] = useState(0)
  const [olxX, setPreviousX] = useState(0)
  const [yPosition, setYPosition] = useState(0)
  const [olxY, setPreviousY] = useState(0)

  const [downloaded, setDownloaded] = useState(false)

  // download image
  const image = useMemo(() => new Image(), [])

  // start Render
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = 600
    canvas.height = 600

    ctxRef.current = ctx
    setXPosition(canvasRef.current.width / 2.5)
    setYPosition(canvasRef.current.height / 2.5)
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
    [image, loadedImage, downloaded, angle, xPosition, yPosition, size]
  )

  // main render when we move image
  useEffect(() => {
    draw()
  }, [draw])

  // change state of moving
  const startDrawing = () => {
    setIsMouseDragging(true)
  }

  // move our image
  const move = ({ nativeEvent }) => {
    if (!isMouseDragging) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    // right
    if (offsetX > olxX) {
      setXPosition((prevState) => prevState + 4)
      setPreviousX(offsetX)
      // left
    } else if (offsetX < olxX) {
      setXPosition((prevState) => prevState - 4)
      setPreviousX(offsetX)
    }

    // up
    if (offsetY > olxY) {
      setYPosition((prevState) => prevState + 4)
      setPreviousY(offsetY)
      // down
    } else if (offsetY < olxY) {
      setYPosition((prevState) => prevState - 4)
      setPreviousY(offsetY)
    }
  }

  // change state of moving
  const finishDrawing = () => {
    setIsMouseDragging(false)
  }

  // change size of image
  const sizeHandler = (e) => {
    setSize(e.target.value)
  }

  // change angle of image if we change it move direction is changed to
  // that will make move top change to move left for example
  const angleHandler = (e) => {
    setAngle(e.target.value)
    setXPosition(canvasRef.current.width / 4)
    setYPosition(canvasRef.current.height / 4)
  }

  const toggleCropHandler = () => {
    setDownloaded(true)
  }

  // save image canvas
  const saveImageToLocal = (event) => {
    let link = event.currentTarget
    link.setAttribute("download", "canvas.png")
    let image = canvasRef.current.toDataURL("image/png")
    link.setAttribute("href", image)
  }

  const scrollHandlerOn = () => {
    document.body.style.overflow = "hidden"
  }
  const scrollHandlerOff = () => {
    document.body.style.overflow = "auto"
  }

  //
  const sizeByWheelHandler = (e) => {
    // wheel up
    if (e.deltaY === -100 && size < 1000) {
      setSize((prevState) => prevState + 10)
    }
    // wheel down
    if (e.deltaY === 100 && size > 200) {
      setSize((prevState) => prevState - 10)
    }
  }

  return (
    <div className={classes.box}>
      <div className={classes.mask_box}>
        <img src={mask} alt="d" className={classes.mask} />
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

'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sun, Moon, Star, CloudRain, Wind, Eraser, Pencil, Circle, Square, Minus, PaintBucket, Droplet } from 'lucide-react'
import React from 'react'

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF',
  '#C0C0C0', '#808080', '#800000', '#808000', '#008000', '#800080', '#008080', '#000080'
]

export default function ArtStudio() {
  const canvasRef = useRef(null)
  const [color, setColor] = useState('#ffffff')
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('brush')
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [gradientColor, setGradientColor] = useState('#000000')
  const [fillColor, setFillColor] = useState('#ffffff')
  const [lineThickness, setLineThickness] = useState(1)
  const [artworkName, setArtworkName] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (backgroundImage) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = backgroundImage
    }
  }, [backgroundImage])

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStartPos({ x, y })
    if (tool === 'brush' || tool === 'eraser') {
      draw(e)
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const endX = event.clientX - rect.left
      const endY = event.clientY - rect.top
      
      switch (tool) {
        case 'line':
          drawLine(ctx, startPos.x, startPos.y, endX, endY)
          break
        case 'circle':
          const radius = Math.sqrt(Math.pow(endX - startPos.x, 2) + Math.pow(endY - startPos.y, 2))
          drawCircle(ctx, startPos.x, startPos.y, radius)
          break
        case 'rectangle':
          drawRectangle(ctx, startPos.x, startPos.y, endX - startPos.x, endY - startPos.y)
          break
        case 'ellipse':
          drawEllipse(ctx, startPos.x, startPos.y, Math.abs(endX - startPos.x), Math.abs(endY - startPos.y))
          break
      }
    }
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = lineThickness
    ctx.lineCap = 'round'

    if (tool === 'brush') {
      ctx.strokeStyle = color
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#000000'
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.drawImage(canvas, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
      
      switch (tool) {
        case 'line':
          drawLine(ctx, startPos.x, startPos.y, x, y)
          break
        case 'circle':
          const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
          drawCircle(ctx, startPos.x, startPos.y, radius)
          break
        case 'rectangle':
          drawRectangle(ctx, startPos.x, startPos.y, x - startPos.x, y - startPos.y)
          break
        case 'ellipse':
          drawEllipse(ctx, startPos.x, startPos.y, Math.abs(x - startPos.x), Math.abs(y - startPos.y))
          break
      }
    }
  }

  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = lineThickness
    ctx.stroke()
  }

  const drawCircle = (ctx, x, y, radius) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = color
    ctx.lineWidth = lineThickness
    ctx.stroke()
  }

  const drawRectangle = (ctx, x, y, width, height) => {
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.strokeStyle = color
    ctx.lineWidth = lineThickness
    ctx.stroke()
  }

  const drawEllipse = (ctx, x, y, radiusX, radiusY) => {
    ctx.beginPath()
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI)
    ctx.strokeStyle = color
    ctx.lineWidth = lineThickness
    ctx.stroke()
  }

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = Math.PI / 2 * 3
    let x = cx
    let y = cy
    let step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    const fileName = artworkName.trim() ? `${artworkName.trim()}.png` : 'my-exoplanet.png'
    link.download = fileName
    link.click()
  }

  const applyGradient = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, gradientColor)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const fillArea = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const targetColor = getPixelColor(imageData, x, y)
    floodFill(imageData, x, y, hexToRgb(fillColor), targetColor)
    ctx.putImageData(imageData, 0, 0)
  }

  const getPixelColor = (imageData, x, y) => {
    const index = (y * imageData.width + x) * 4
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3]
    }
  }

  const setPixelColor = (imageData, x, y, color) => {
    const index = (y * imageData.width + x) * 4
    imageData.data[index] = color.r
    imageData.data[index + 1] = color.g
    imageData.data[index + 2] = color.b
    imageData.data[index + 3] = color.a
  }

  const floodFill = (imageData, x, y, fillColor, targetColor) => {
    const pixelsToCheck = [{x, y}]
    const width = imageData.width
    const height = imageData.height

    while (pixelsToCheck.length > 0) {
      const pixel = pixelsToCheck.pop()
      const currentColor = getPixelColor(imageData, pixel.x, pixel.y)

      if (colorsMatch(currentColor, targetColor) && !colorsMatch(currentColor, fillColor)) {
        setPixelColor(imageData, pixel.x, pixel.y, fillColor)

        if (pixel.x > 0) pixelsToCheck.push({x: pixel.x - 1, y: pixel.y})
        if (pixel.y > 0) pixelsToCheck.push({x: pixel.x, y: pixel.y - 1})
        if (pixel.x < width - 1) pixelsToCheck.push({x: pixel.x + 1, y: pixel.y})
        if (pixel.y < height - 1) pixelsToCheck.push({x: pixel.x, y: pixel.y + 1})
      }
    }
  }

  const colorsMatch = (color1, color2) => {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255
    } : null
  }

  const backgroundOptions = [
    { value: null, label: 'Black Space' },
    { value: '/placeholder.svg?height=600&width=800&text=Starry+Night', label: 'Starry Night' },
    { value: '/placeholder.svg?height=600&width=800&text=Nebula', label: 'Nebula' },
    { value: '/placeholder.svg?height=600&width=800&text=Galaxy', label: 'Galaxy' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Exoplanet Art Studio</h1>
      <div className="flex flex-col items-center space-y-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-white cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onClick={tool === 'fill' ? fillArea : undefined}
        />
        <div className="flex flex-wrap gap-4 justify-center">
          <div>
            <Label htmlFor="color">Color</Label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="block mt-1"
            />
          </div>
          <div className="w-48">
            <Label htmlFor="brush-size">Brush Size</Label>
            <Slider
              id="brush-size"
              min={1}
              max={50}
              step={1}
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="line-thickness">Line Thickness</Label>
            <Select value={lineThickness.toString()} onValueChange={(value) => setLineThickness(parseInt(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select thickness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1px</SelectItem>
                <SelectItem value="2">2px</SelectItem>
                <SelectItem value="4">4px</SelectItem>
                <SelectItem value="6">6px</SelectItem>
                <SelectItem value="8">8px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tool">Tool</Label>
            <Select value={tool} onValueChange={setTool}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brush"><Pencil className="inline-block mr-2" size={16} /> Brush</SelectItem>
                <SelectItem value="eraser"><Eraser className="inline-block mr-2" size={16} /> Eraser</SelectItem>
                <SelectItem value="line"><Minus className="inline-block mr-2" size={16} /> Line</SelectItem>
                <SelectItem value="circle"><Circle className="inline-block mr-2" size={16} /> Circle</SelectItem>
                <SelectItem value="rectangle"><Square className="inline-block mr-2" size={16} /> Rectangle</SelectItem>
                <SelectItem value="ellipse"><Circle className="inline-block mr-2" size={16} /> Ellipse</SelectItem>
                <SelectItem value="star"><Star className="inline-block mr-2" size={16} /> Star</SelectItem>
                <SelectItem value="fill"><PaintBucket className="inline-block mr-2" size={16} /> Fill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="background">Background</Label>
            <Select value={backgroundImage} onValueChange={setBackgroundImage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a background" />
              </SelectTrigger>
              <SelectContent>
                {backgroundOptions.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="gradient-color">Gradient Color</Label>
            <input
              type="color"
              id="gradient-color"
              value={gradientColor}
              onChange={(e) => setGradientColor(e.target.value)}
              className="block mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fill-color">Fill Color</Label>
            <input
              type="color"
              id="fill-color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="block mt-1"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {colorPalette.map((paletteColor) => (
            <Button
              key={paletteColor}
              className="w-8 h-8 p-0"
              style={{ backgroundColor: paletteColor }}
              onClick={() => setColor(paletteColor)}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-end">
          <div>
            <Label htmlFor="artwork-name">Artwork Name</Label>
            <Input
              id="artwork-name"
              value={artworkName}
              onChange={(e) => setArtworkName(e.target.value)}
              placeholder="Enter artwork name"
              className="w-[250px]"
            />
          </div>
          <Button onClick={clearCanvas}>Clear Canvas</Button>
          <Button onClick={downloadCanvas}>Download Artwork</Button>
          <Button onClick={applyGradient}>Apply Gradient</Button>
        </div>
      </div>
      <div className="text-center space-y-4">
        <p>Use your imagination to draw exoplanets and their star systems!</p>
        <p>Think about different planet types, star colors, and even alien landscapes.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="icon" title="Add a sun" onClick={() => setTool('star')}>
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Add a moon" onClick={() => setTool('circle')}>
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Add stars" onClick={() => setTool('star')}>
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Add clouds" onClick={() => setTool('brush')}>
            <CloudRain className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Add wind" onClick={() => setTool('line')}>
            <Wind className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
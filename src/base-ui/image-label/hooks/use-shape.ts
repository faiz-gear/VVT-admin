import { Ref } from 'vue'
import { fabric } from 'fabric'
import { CANVAS_COLOR, SHAPE_TYPE } from '../src/image-label-enum'

export function useShape(canvasRef: Ref<fabric.Canvas | undefined>) {
  // 增加矩形
  const addRect = () => {
    const canvas = canvasRef.value!
    const rect = new fabric.Rect({
      top: 30,
      left: 30,
      height: 100,
      width: 150,
      fill: CANVAS_COLOR.FILL_COLOR,
      rx: 10, // x轴的圆角半径
      ry: 10 // y轴的圆角半径
    })
    canvas.add(rect)
    rect.on('selected', () => {
      rect.set('fill', CANVAS_COLOR.ACTIVE_FILL_COLOR)
    })
    rect.on('deselected', () => {
      rect.set('fill', CANVAS_COLOR.FILL_COLOR)
    })

    return rect
  }

  // 增加直线
  const addLine = () => {
    const canvas = canvasRef.value!
    const line = new fabric.Line([600, 300, 400, 400], {
      stroke: '#f0f'
    })
    canvas.add(line)

    return line
  }

  // 增加折线
  const addPolyLine = () => {
    const canvas = canvasRef.value!
    const polyLine = new fabric.Polyline(
      [
        {
          x: 400,
          y: 400
        },
        {
          x: 300,
          y: 500
        },
        {
          x: 600,
          y: 600
        }
      ],
      {
        stroke: '#00f',
        fill: 'transparent'
      }
    )
    canvas.add(polyLine)

    return polyLine
  }

  // 增加多边形
  const addPolygon = () => {
    const canvas = canvasRef.value!
    const polygon = new fabric.Polygon(
      [
        {
          x: 300,
          y: 300
        },
        {
          x: 400,
          y: 400
        },
        {
          x: 520,
          y: 350
        },
        {
          x: 420,
          y: 280
        },
        {
          x: 150,
          y: 160
        }
      ],
      {
        fill: CANVAS_COLOR.FILL_COLOR,
        stroke: 'green',
        strokeWidth: 1
      }
    )
    polygon.on('selected', () => {
      polygon.set('fill', CANVAS_COLOR.ACTIVE_FILL_COLOR)
    })
    polygon.on('deselected', () => {
      polygon.set('fill', CANVAS_COLOR.FILL_COLOR)
    })
    canvas.add(polygon)

    return polygon
  }

  const ShapeMap = {
    [SHAPE_TYPE.LINE]: addLine,
    [SHAPE_TYPE.POLY_LINE]: addPolyLine,
    [SHAPE_TYPE.RECT]: addRect,
    [SHAPE_TYPE.POLYGON]: addPolygon
  }

  return ShapeMap
}

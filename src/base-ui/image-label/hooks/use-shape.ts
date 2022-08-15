import { fabric } from 'fabric'
import { Ref, toRaw } from 'vue'
import { CANVAS_COLOR, SHAPE_TYPE } from '../src/image-label-enum'

export function useShape(canvasRef: Ref<fabric.Canvas | undefined>) {
  // 增加直线
  const createLine = (points: number[], fallback?: (shape: fabric.Object) => void) => {
    const canvas = toRaw(canvasRef.value)
    const line = new fabric.Line(points.concat(points), {
      stroke: CANVAS_COLOR.STROKE_SHALLOW_COLOR // 笔触颜色
    })
    fallback && fallback(line)
    canvas?.add(line)

    return line
  }

  // 增加折线
  const createPolyline = (
    points: { x: number; y: number }[],
    { stroke = CANVAS_COLOR.STROKE_SHALLOW_COLOR, fill = 'transparent', objectCaching = false } = {},
    fallback?: (shape: fabric.Object) => void
  ) => {
    const canvas = toRaw(canvasRef.value)
    const polyline = new fabric.Polyline(points, {
      stroke,
      fill,
      objectCaching
    })
    fallback && fallback(polyline)
    canvas?.add(polyline)

    return polyline
  }

  // 增加矩形
  const createRect = (
    { top = 0, left = 0, width = 0, height = 0, fill = 'transparent', stroke = CANVAS_COLOR.STROKE_SHALLOW_COLOR } = {},
    fallback?: (shape: fabric.Object) => void
  ) => {
    const canvas = toRaw(canvasRef.value)
    const rect = new fabric.Rect({
      top,
      left,
      height,
      width,
      fill,
      stroke
    })
    console.log('🚀 ~ file: use-shape.ts ~ line 47 ~ useShape ~ rect', rect, canvasRef.value)
    fallback && fallback(rect)
    canvas?.add(rect)

    return rect
  }

  // 增加多边形
  const createPolygon = (
    points: { x: number; y: number }[],
    { stroke = CANVAS_COLOR.STROKE_SHALLOW_COLOR, fill = 'transparent', objectCaching = false } = {},
    fallback?: (shape: fabric.Object) => void
  ) => {
    const canvas = toRaw(canvasRef.value)
    const polygon = new fabric.Polygon(points, {
      fill,
      stroke,
      objectCaching
    })
    fallback && fallback(polygon)
    canvas?.add(polygon)

    return polygon
  }

  const ShapeMap = {
    [SHAPE_TYPE.LINE]: createLine,
    [SHAPE_TYPE.POLYLINE]: createPolyline,
    [SHAPE_TYPE.RECT]: createRect,
    [SHAPE_TYPE.POLYGON]: createPolygon
  }

  return ShapeMap
}

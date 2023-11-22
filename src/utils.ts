import * as pixi from "pixi.js"

export function clone<Obj>(obj: Obj): Obj {
  return JSON.parse(JSON.stringify(obj))
}

export function times<Value>(
  count: number,
  generator: (index: number) => Value,
): Value[] {
  return new Array(count).fill(0).map((_, index) => generator(index))
}

export function equals(a: pixi.IPointData, b: pixi.IPointData): boolean {
  return a.x === b.x && a.y === b.y
}

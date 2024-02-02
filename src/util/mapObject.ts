export default function mapObject <ObjT extends object, ArrT>(
    arr: ArrT[], 
    mapKey: (el: ArrT, i: number, arr: ArrT[]) => string, 
    mapValue: (el: ArrT, i: number, arr: ArrT[]) => ObjT
) {
  return Object.fromEntries(
    arr.map((el, i, arr) => [mapKey(el, i, arr), mapValue(el, i, arr)])
  );
}
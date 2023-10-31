export enum ClassType {
  //Annotation
  MARKER,
  CIRCLE,
  POLYLINE,
  POLYGON,
  POI,
  BUILDING,

  //UserLayer
  VECTOR_TILE_LAYER,

  //Query
  BUILDING_QUERY_RESULT,

  //AnnotationData
  POLYLINE_DATA,
  POLYGON_DATA,

  //Item
  ICON,
  LATLNG,
  POINT,
  CAMERA_POSITION,

  //Bounds
  LATLNG_BOUNDS,

  //Label
  MARKER_LABEL,

  //Feature
  FEATURE,
  TILE_FEATURE,
  VECTOR_TILE_FEATURE
}

export class Map4dObject {
  private readonly classType: ClassType

  constructor(classType: ClassType) {
    this.classType = classType
  }

  /**
   * Check classType in mapObject
   * @param mapObject 
   * @param classType 
   * @returns 
   */
  static isClassType(mapObject: any, classType: ClassType): boolean {
    let mfClassType = (mapObject || {}).classType
    return mfClassType == classType
  }
}
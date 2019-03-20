function rawQuery(obj,string){
  obj.isRaw = true
  obj.query=string
  return obj
}
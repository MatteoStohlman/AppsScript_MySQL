function select(obj,colName){
  //Validate//
  if(colName){
    obj.isSelect=true
  }
  //Process If Valid//
  if(Array.isArray(colName)){
    obj.selectFields.push(colName.join(','))
  }else{
    obj.selectFields.push(colName)
  }
  //debug(obj.selectFields)
  return obj
}

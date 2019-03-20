function orderBy(obj,values) {
  if(values && values.length){
    obj.isOrderBy=true
    if(typeof values=='object'){
      obj.orderBys = values.map(function(value){return value})
    }else{
      obj.orderBys=[values]
    }    
  }else{
    return obj
  }
  return obj
  
}

function createOrderByClause(obj){
  obj.query+=' ORDER BY '+obj.orderBys.join(',')
  return obj
}

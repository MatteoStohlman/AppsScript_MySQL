function groupBy(obj,values) {
  if(values && values.length){
    obj.isGroupBy=true
    if(typeof values=='object'){
      obj.groupBys = values.map(function(value){return value})
    }else{
      obj.groupBys=[values]
    }    
  }else{
    return obj
  }
  return obj
  
}

function createGroupByClause(obj){
  obj.query+=' GROUP BY '+obj.groupBys.join(',')
  return obj
}

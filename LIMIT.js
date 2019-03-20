function limit(obj,limitNum) {
  if(limitNum){
    obj.isLimit=true
    obj.limit=limitNum
  } 
  return obj
}

function createLimitClause(obj){
  obj.query+=' LIMIT '+obj.limit
  return obj
}

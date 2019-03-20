function join(obj,table,fromCol,comparison,joinCol,options) {
  obj.isJoin=true
  var joinObj = {table:table,fromCol:fromCol,comparison:comparison,joinCol:joinCol}
  if(options)
    joinObj.options=options
  obj.joins.push(joinObj)
  return obj
}

function createJoinClause(obj){
  obj.joins.map(function(join){
    var joinType='JOIN'
    if(join.options){
      if(join.options.type)
        joinType=join.options.type
    }
    obj.query+=" "+joinType+" "+join.table+" ON "+join.fromCol+" "+join.comparison+" "+join.joinCol
  })
  return obj
}
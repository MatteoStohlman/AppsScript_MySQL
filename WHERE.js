//SETTERS//
function where(obj,colName,comparison,value,isRaw){
  //Validate//
  var allowedComparisons=['=','!=','>','>=','<=','<','CONTAINS IGNORING CASE','LIKE','STARTS WITH','ENDS WITH','CONTAINS','DOES NOT CONTAIN','NOT EQUAL TO','IN']
  if(allowedComparisons.indexOf(comparison)<0){
    throw 'Comparison Operator: "'+comparison+'" Not Allowed'
  }
  //PROCESS IF VALID//
  obj.isWhere=true;
  obj.wheres.push({colName:colName,comparison:comparison,value:value,isRaw:isRaw?true:false})
  return obj
}

function whereIn(obj,col,values){
 obj.wheres.push('') 
}

function whereNull(obj,column){
  obj.addSoftDelete=false;
  obj.isWhere=true;
  obj.wheres.push({colName:column,comparison:"IS",value:"NULL",isRaw:true})
  return obj
}

function whereNotNull(obj,column){
  obj.isWhere=true;
  obj.wheres.push({colName:column,comparison:"IS NOT",value:"NULL",isRaw:true})
  return obj
}


//BUILDERS//
function createWhereClause(obj){
  obj.query+=" WHERE "
  var whereI = obj.wheres[0]
  Logger.log(whereI)
  var value = isNaN(whereI.value)&&!whereI.isRaw?"'"+whereI.value+"'":whereI.value
  obj.query+=whereI.colName+" "+whereI.comparison+" "+value
  //Process Additional Queries into Additional Array then Join Them with AND
  if(obj.wheres.length>1){
    var additionalQueries = []
    for(var j=1;j<obj.wheres.length;j++){
      var whereI = obj.wheres[j]
      var value = isNaN(whereI.value)&&!whereI.isRaw?"'"+whereI.value+"'":whereI.value
      additionalQueries.push(whereI.colName+" "+whereI.comparison+" "+value)
    }
    obj.query+=" AND "+additionalQueries.join(" AND ")
  } 
  Logger.log('returning obj as '+JSON.stringify(obj.query))
  return obj
}
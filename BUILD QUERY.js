function buildQuery(obj){
  //SELECT
  if(obj.selectFields.length)
    selectFields = obj.selectFields.join(',')
  else
    selectFields='*'
    obj.query+="SELECT "+selectFields
    
  //FROM
  if(obj.tableName)
    obj.query+=' FROM '+obj.tableName
  else{throw 'No Table Name Given.'}
  
  //JOIN
  if(obj.isJoin)
    var obj = createJoinClause(obj)
  
  //SOFT DELETE
  if(obj.addSoftDelete){
    var tableNameArray=obj.tableName.split(" ")
    var tableName = tableNameArray[tableNameArray.length-1]
    //var obj = whereNull(obj,tableName+'.date_deleted')
    if(obj.isJoin){
      for(var i=0;i<obj.joins.length;i++){
        var join = obj.joins[i]
        //debug(join.table)
        tableNameArray=join.table.split(" ")
        //debug(tableNameArray)
        tableName = tableNameArray[tableNameArray.length-1]
        //debug(tableName)
        //var obj= whereNull(obj,tableName+".date_deleted")
      }
    }
  }
  
  //WHERE
  if(obj.wheres.length)
    obj = createWhereClause(obj)
  
  //GROUP BY
  if(obj.groupBys.length)
    obj = createGroupByClause(obj)
  
  //ORDER BY
  if(obj.isOrderBy)
    obj=createOrderByClause(obj)
  
  //LIMIT
    if(obj.isLimit)
      obj = createLimitClause(obj)
  
  debug(obj.query)
  return obj
}
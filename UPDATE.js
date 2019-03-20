function update(obj,values){
  if(!values){return obj}
  obj.isUpdate=true
  if(!values.date_modified)
    values.date_modified=NOW()
  obj.updates = values
  return obj
}

//BUILDERS//
function createUpdateClause(obj){
  //VALIDATE
  if(!Object.keys(obj.updates).length && !obj.wheres.length)
    throw 'Missing Updates or Where Clause'
  
  //Create SQL for Update Columns
  var updateValues = []
  var setValues = Object.keys(obj.updates).map(function(col){
    updateValues.push(obj.updates[col])
    return col+"=?";
  })
  var sql = 'UPDATE '+
    obj.tableName+
    " SET "+
    setValues.join(',')
  obj.setQuery(sql)
  //ADD WHERE CLAUSE
  obj = createWhereClause(obj)
  sql=obj.query
  debug(sql)
  var stmt = obj.conn.prepareStatement(sql)
  
  updateValues.map(function(value,index){
    //debug('setting string: '+value)
    stmt.setString(index+1,value)
  })
  var affectedRows = stmt.executeUpdate()
  obj.conn.close(); 
  if(affectedRows>0){
    return {
      status:true,
      message:"Update Success, Affected Rows: "+affectedRows,
      affectedRows:affectedRows
    }
  }else{
    return{
      status:false,
      affectedRows:affectedRows
    }
  }
}

//if(Object.keys(this.updates).length){
//          var updates = this.updates
//          this.query+=" UPDATE "+this.tableId+" SET "
//          var updateSets=[]
//          var insertValue;
//          Object.keys(updates).map(function(colName){
//            insertValue = updates[colName]
//            if(isNaN(insertValue)){insertValue="'"+insertValue+"'"}
//            updateSets.push(colName+' = '+insertValue)
//          })
//          this.query+=updateSets.join(",")
//        }
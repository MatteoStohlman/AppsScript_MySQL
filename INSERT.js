//SETTERS//
function insert(obj,insertValues,options) {
  //Validation//
  if(!insertValues[0])
    return obj
  else
    obj.isInsert=true
    obj.insertOptions=options?options:{}
  //PROCESS IF VALID//
  var addCreatedColumn = true
  var addModifiedColumn = true
  var insertColumns = Object.keys(insertValues[0])
  if(insertColumns.indexOf('date_created')<0)
    insertColumns.push('date_created')
  else
    addCreatedColumn=false
  if(insertColumns.indexOf('date_modified')<0)
    insertColumns.push('date_modified')
  else
    addModifiedColumn=false
  
  var inserts = []
  for(i in insertValues){
    var insertI = insertValues[i];
    if(addCreatedColumn)
      insertI['date_created']=NOW()
    if(addModifiedColumn)
      insertI['date_modified']=NOW()
    var insertValue = []
    for(j in insertColumns){
      insertValue.push(insertI[insertColumns[j]])
    }
    inserts.push(insertValue)
  }
  Logger.log(insertColumns.length)
  Logger.log(inserts[0].length)
  obj.inserts = {columns:insertColumns,values:inserts}
  Logger.log(obj.inserts)
  return obj
}

//BUILDERS//
function createInsertClause(obj){
  obj.conn.setAutoCommit(false);
  
  //OPTIONS//
  var INSERT_TEXT = 'INSERT'
  var ON_DUPLICATE_KEY=''
  if(obj.insertOptions.ignoreDuplicates){
    INSERT_TEXT = 'INSERT IGNORE'
  }
  if(obj.insertOptions.onDuplicateKey){
    ON_DUPLICATE_KEY="ON DUPLICATE KEY UPDATE "+obj.insertOptions.onDuplicateKey
  }
  
  var questionMarks = obj.inserts.columns.map(function(col){
    return "?";
  })
  var sql = INSERT_TEXT+' INTO '+
    obj.tableName+
    " ("+
    obj.inserts.columns.join(',')+
    ") VALUES ("+
    questionMarks.join(',')
    +") "
    +ON_DUPLICATE_KEY
  var stmt = obj.conn.prepareStatement(sql)
  Logger.log(obj.inserts)
  obj.inserts.values.map(function(valueSet){
    valueSet.map(function(value,index){
      stmt.setString(index+1,value?value:null)
    })
    stmt.addBatch()
  })
  debug(obj.conn.toString())
  
  var batch = stmt.executeBatch()
  obj.conn.commit();
  obj.conn.close();
  if(batch[0]>0){
    return {
      status:true,
      affectedRows:batch[0]
    }
  }else{
    return {status:false,affectedRows:batch}
  }  
}
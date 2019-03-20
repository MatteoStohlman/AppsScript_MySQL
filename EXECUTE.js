function execute(obj,additionalQueries) {
  //HANDLE ADDITIONAL QUERIES
  if(additionalQueries)
    obj=executeQuery(obj,additionalQueries)
  //HANDLE RAW QUERY
  if(obj.isRaw)
    return runMySQLQuery(obj)
  //HANDLE INSERTS
  if(obj.isInsert && Object.keys(obj.inserts).length)
    return createInsertClause(obj)
  if(obj.isUpdate && Object.keys(obj.updates).length){
    return createUpdateClause(obj)
  }
  //ELSE IS A RETRIEVAL QUERY
  obj.buildQuery()
  return runMySQLQuery(obj)
}

function runMySQLQuery(obj){
  var stmt = obj.conn.createStatement();
  var results = stmt.executeQuery(obj.query);
  try{
    var numCols = results.getMetaData().getColumnCount();
    var returnValue = []
    while (results.next()) {
      var row = {};
      for (var col = 0; col < numCols; col++) {
        var colName = results.getMetaData().getColumnLabel(col+1)
        row[colName]=results.getString(col + 1)
      }
      returnValue.push(row)
    }
  }catch(e){
    returnValue=e
  }
  results.close();
  stmt.close();
  obj.conn.close()
  return returnValue
}

function executeQuery(obj,query){
  var stmt = obj.conn.createStatement();
  debug('Running: '+query)
  var results = stmt.executeQuery(query);
  return obj
}

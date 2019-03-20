function init(address,db,user,pw,debug){
  this.address = address;
  this.pw = pw;
  this.db = db;
  this.user = user;
  this.instanceUrl = 'jdbc:mysql://' + this.address;
  this.dbUrl = this.instanceUrl + '/' + this.db;
  this.DEBUG=debug;
  this.conn = Jdbc.getConnection(this.dbUrl, this.user, this.pw);
  this.table = function(tableName){return new table(tableName,this.conn)}
  return this
}
function table(tableName,conn){
  this.tableName=tableName;
  this.isSelect=false;
  this.selectFields = []
  if(conn==undefined || !conn){
    this.conn = Jdbc.getConnection(dbUrl, root, rootPwd);
  }else{
   this.conn = conn 
  }
  
//   Jdbc.getConnection(url).prepareStatement(sql).executeQuery().getMetaData().getColumnName(column)
  this.isWhere=false;
  this.wheres = []
  
  this.addSoftDelete=true
  
  this.isInsert=false;
  this.inserts={}
  this.insertOptions={}//ignoreDuplicates
  
  this.isUpdate=false;
  this.updates={}
  
  this.isGroupBy=false
  this.groupBys=[]
  
  this.isOrderBy=false
  this.orderBys=[]
  
  this.isJoin=false
  this.joins=[]
  
  this.isLimit=false
  this.limit=false
  
  this.isRaw=false
  
  this.query=''
  
  this.DEBUG=true;
  
  //MySQL COMMANDS//
  this.select=function(colName){return select(this,colName)}
  this.where=function(colName,comparison,value,isRaw){return where(this,colName,comparison,value,false)}
  this.whereRaw=function(colName,comparison,value){return where(this,colName,comparison,value,true)}
  this.limit=function(limitNum){return limit(this,limitNum)}
  this.whereNull=function(colName){return whereNull(this,colName)}
  this.whereNotNull=function(colName){return whereNotNull(this,colName)}
  this.whereIn=function(colName,valuesArray){return whereIn(this,colName,valuesArray)}
  this.insert = function(insertValues,options){return insert(this,insertValues,options)}
  this.update = function(updateValues){return update(this,updateValues)}
  this.groupBy = function(groupByValues){return groupBy(this,groupByValues)}
  this.orderBy = function(orderByValues){return orderBy(this,orderByValues)}
  this.join = function(table,fromCol,comparison,joinCol,options){return join(this,table,fromCol,comparison,joinCol,options)}
  this.rawQuery= function(string){return rawQuery(this,string)}
  //UTILS//
  this.dump=function(){dump(this)}
  this.buildQuery = function(){return buildQuery(this)}
  this.execute = function(additionalQueries){return execute(this,additionalQueries)}
  this.setQuery=function(queryString){this.query=queryString;return this}
  return this
}
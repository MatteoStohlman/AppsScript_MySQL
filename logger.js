function log(logValue) {
  Logger.log(logValue)  
}
function debug(logValue){
  if(DEBUG){
    Logger.log(logValue)
  }
}

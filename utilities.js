function dump(obj) {
  Logger.log(obj)
}

function NOW(type){
  if(!type)
    type='db'
  switch(type){
    case 'db':
      return moment().format('YYYY-MM-DD HH:mm');
    case 'pretty':
      return moment().format('MM/DD hh:mma');
    case 'pretty24':
      return moment().format('MM/DD HH:mm');
    case 'prettyWithYear':
      return moment().format('MM/DD/YY hh:mma');
    case 'prettyWithYear24':
      return moment().format('MM/DD/YY HH:mm');
  }
}
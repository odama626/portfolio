export default store => next => action => {
  let value = next(action);
  
  if (action.type === '@@router/LOCATION_CHANGE' && action.payload) {
    let id = action.payload.hash;
    if (id && id.length > 0) {
      let element = document.getElementById(id.substring(1))
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
  return value;
}
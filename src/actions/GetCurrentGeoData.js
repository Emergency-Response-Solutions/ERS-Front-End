export function getCurrenctGeoData(latitude, longitude) {
  return function(dispatch) {
    const geoObj = { latitude: latitude, longitude: longitude };
    dispatch({ type: 'SET_ORIGIN', payload: geoObj });
  };
}

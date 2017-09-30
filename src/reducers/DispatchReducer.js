export default function reducer(
  state = {
    current_dispatch_crossstreets: null,
    current_dispatch_description: null,
    current_dispatch_district: null,
    current_dispatch_id: null,
    current_dispatch_physical_map_ref: null,
    current_dispatch_radiofreq: null,
    current_dispatch_address: null,
    current_dispatch_assignment_array: [],
    current_dispatch_time_stamp: null,
    current_dispatch_misc: null,
    geo_latitude_origin: null,
    geo_longitude_origin: null,
    geo_latitude_destination: null,
    geo_longitude_destination: null,
    error: null
  },
  action
) {
  switch (action.type) {
    case 'SET_CURRENT_DISPATCH': {
      return {
        ...state,
        current_dispatch_assignment_array: action.payload.assignment,
        current_dispatch_crossstreets: action.payload.crossstreets,
        current_dispatch_description: action.payload.description,
        current_dispatch_district: action.payload.district,
        current_dispatch_id: action.payload.id,
        current_dispatch_physical_map_ref: action.payload.map,
        current_dispatch_radiofreq: action.payload.radiofreq,
        current_dispatch_address:
          action.payload.streetnumber + ' ' + action.payload.streetname,
        current_dispatch_time_stamp: action.payload.timeout,
        current_dispatch_misc: action.payload.misc
      };
    }
    case 'SET_ORIGIN': {
      return {
        ...state,
        geo_latitude_origin: action.payload.latitude,
        geo_longitude_origin: action.payload.longitude
      };
    }
    case 'SET_DESTINATION': {
      return {
        ...state,
        geo_latitude_destination: action.payload.destinationLat,
        geo_longitude_destination: action.payload.destinationLng
      };
    }
    case 'SET_CURRENT_DISPATCH_FAILED': {
      return { ...state, error: action.payload };
    }
  }

  return state;
}

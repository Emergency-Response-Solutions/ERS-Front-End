import { connect } from 'react-redux';
import { getERS_DispatchDetails } from '../actions/GetERS_DispatchAction'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

@connect((store) => {
  return {
    current_dispatch_assignment_array: store.ERS_DispatchDetails.current_dispatch_assignment_array,
    current_dispatch_crossstreets: store.ERS_DispatchDetails.current_dispatch_crossstreets,
    current_dispatch_description: store.ERS_DispatchDetails.current_dispatch_description,
    current_dispatch_district: store.ERS_DispatchDetails.current_dispatch_district,
    current_dispatch_id: store.ERS_DispatchDetails.current_dispatch_id,
    current_dispatch_physical_map_ref: store.ERS_DispatchDetails.current_dispatch_physical_map_ref,
    current_dispatch_radiofreq: store.ERS_DispatchDetails.current_dispatch_radiofreq,
    current_dispatch_address: store.ERS_DispatchDetails.current_dispatch_address,
    current_dispatch_time_stamp: store.ERS_DispatchDetails.current_dispatch_time_stamp,
    current_dispatch_misc: store.ERS_DispatchDetails.current_dispatch_misc,
    geo_latitude_destination: store.ERS_DispatchDetails.geo_latitude_destination,
    geo_longitude_destination: store.ERS_DispatchDetails.geo_longitude_destination,
  }
})


class ERS_DispatchDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      latitudeStart: null,
      longitudeStart: null
    }
  }

  componentDidMount() {

    var urlParams = this.props.location.search;
    var id = urlParams.replace('?id=', '');

    this.props.dispatch(getERS_DispatchDetails(id))

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({latitudeStart : position.coords.latitude})
      this.setState({longitudeStart : position.coords.longitude})
    }, () => {
      console.log('denied');
    });

  }

  render(){
    const { current_dispatch_description, current_dispatch_address, current_dispatch_assignment_array, current_dispatch_crossstreets, current_dispatch_radiofreq, current_dispatch_physical_map_ref, current_dispatch_time_stamp, current_dispatch_misc, current_dispatch_district, current_dispatch_id, geo_latitude_destination, geo_longitude_destination} = this.props;

    console.log(geo_latitude_destination);
    console.log(geo_longitude_destination);

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: this.state.latitudeStart, lng: this.state.longitudeStart }}
      >
        <Marker
          position={{ lat: this.state.latitudeStart, lng: this.state.longitudeStart }}
        />
        <Marker
          position={{ lat: geo_latitude_destination, lng: geo_longitude_destination }}
        />

      </GoogleMap>
    ));

    return (
      <div>

        <ul>
          <li>Description</li>
          <li>{current_dispatch_description}</li>
          <li>Address</li>
          <li>{current_dispatch_address}</li>
          <li>Apparatus Assigned</li>
          <li>{current_dispatch_assignment_array.map((vehicle) =>
            <span>{vehicle + ' '}</span>
          )}</li>
          <li>Nearest Cross Streets</li>
          <li>{current_dispatch_crossstreets}</li>
          <li>Radio Channel</li>
          <li>{current_dispatch_radiofreq}</li>
          <li>Physical Map Reference</li>
          <li>{current_dispatch_physical_map_ref}</li>
          <li>Dispatch Timeout</li>
          <li>{current_dispatch_time_stamp}</li>
          <li>Misc. Details</li>
          <li>{current_dispatch_misc}</li>
        </ul>


        {!this.state.latitudeStart && !geo_latitude_destination
          ?
          <div></div>
          :
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        }

      </div>
    )
  }
}

export default ERS_DispatchDetails;
window.ERS_DispatchDetails = ERS_DispatchDetails;

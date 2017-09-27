import { connect } from 'react-redux';
import { SetCurrentDispatch } from '../../actions/DispatchActions'

@connect((store) => {
  return {
    current_dispatch_description: store.dispatch.current_dispatch_description,
    current_dispatch_address: store.dispatch.current_dispatch_address,
    current_dispatch_apparatus_id_array: store.dispatch.current_dispatch_apparatus_id_array,
    current_dispatch_nearest_xstreets: store.dispatch.current_dispatch_nearest_xstreets,
    current_dispatch_radio_channel: store.dispatch.current_dispatch_radio_channel,
    current_dispatch_physical_map_ref: store.dispatch.current_dispatch_physical_map_ref,
    current_dispatch_time_stamp: store.dispatch.current_dispatch_time_stamp,
    current_dispatch_misc: store.dispatch.current_dispatch_misc,
  }
})


class DispatchDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    // firebase.database.ref('/dispatches').then(function(snapshot){
    //   snapshot.forEach(function(disp){
    // this.props.dispatch(SetCurrentDispatch(disp.val()));
    //   }.bind(this))
    // }.bind(this))
  }

  render(){

    const { current_dispatch_description, current_dispatch_address, current_dispatch_apparatus_id_array, current_dispatch_nearest_xstreets, current_dispatch_radio_channel, current_dispatch_physical_map_ref, current_dispatch_time_stamp, current_dispatch_misc } = this.props;

    return (
      <div>
        <ul>
          <li>Description</li>
          <li>{current_dispatch_description}</li>
          <li>Address</li>
          <li>{current_dispatch_address}</li>
          <li>Vehicles On Site</li>
          <li>{current_dispatch_apparatus_id_array}</li>
          <li>Nearest Cross Street</li>
          <li>{current_dispatch_nearest_xstreets}</li>
          <li>Radio Channel</li>
          <li>{current_dispatch_radio_channel}</li>
          <li>Physical Map Reference</li>
          <li>{current_dispatch_physical_map_ref}</li>
          <li>Dispatch Timestamp</li>
          <li>{current_dispatch_time_stamp}</li>
          <li>Misc. Details</li>
          <li>{current_dispatch_misc}</li>
        </ul>
      </div>
    )
  }
}

window.DispatchDetails = DispatchDetails;

import { connect } from 'react-redux';
import { SetCurrentDispatch } from '../actions/DispatchActions'

@connect((store) => { return {}})

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }


  render() {

    return (
      <div>
        <button type="button" onClick={()=>{this.props.dispatch(SetCurrentDispatch('Fire Alarm in District 3', '435 Powell Street', ['SF1', 'SF4'], 'Powell AND Market', 435.23, 'E4', Date.now(), 'Current roadblocks on Market and 3rd'))}}>UPDATE DISPATCH</button>
        <br/>
        <DispatchDetails />
      </div>
    )
  }
}

window.App = App;

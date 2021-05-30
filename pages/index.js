// import { getStateList } from '../util_function';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = (props) => {

  const [stateList, setStateList] = useState([]);

  const getStateList = async () => {
    try {
      const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
      setStateList(response.data.states);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getStateList();
  }, [])

  return (
    <div>
      <div className="home_select_container">
        <div className="home_select_form">
          <form>
            <select
              name="state"
              id="state"
              className="home_select_input"
            >
              {
                stateList.map((stateInfo, index) => {
                  {
                    return index === 0 ? <option key={index} value="0">Select State</option> : <option key={index} value={stateInfo.state_id}>{stateInfo.state_name}</option>
                  }
                })
              }
            </select>
            <select
              name="state"
              id="state"
              className="home_select_input"
            >
              {
                stateList.map((stateInfo, index) => (
                  <option key={index} value={stateInfo.state_id}>{stateInfo.state_name}</option>
                ))
              }
            </select>
          </form>
        </div>
      </div>
    </div>
  )
};



export default Home;

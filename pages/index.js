import { getStateList, getDistricts, getVaccineDetails } from '../util_function';
import { useEffect, useState } from 'react';
import SelectForm from '../components/SelectForm';
import HospitalInfo from '../components/HospitalInfo';

const Home = () => {

  const [stateList, setStateList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [loading, setLoading] = useState(false);

  const getState = async () => {
    const response = await getStateList();
    setStateList(response.states);
  }

  useEffect(() => {
    getState();
  }, [])

  const handleStateSelect = async (e, state, type) => {
    state(e.target.value);
    if (type === "state") {
      const response = await getDistricts(e.target.value);
      setDistrictsList(response.districts);
    }
  }

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getVaccineDetails(selectedDistrictCode);
    setVaccineList(response.sessions);
    setLoading(false);
  }


  return (
    <div>
      <div className="home_select_container">
        <SelectForm
          handleSearchFormSubmit={handleSearchFormSubmit}
          handleStateSelect={handleStateSelect}
          setSelectedDistrictCode={setSelectedDistrictCode}
          setSelectedStateCode={setSelectedStateCode}
          selectedStateCode={selectedStateCode}
          selectedDistrictCode={selectedDistrictCode}
          stateList={stateList}
          districtsList={districtsList}
          loading={loading}
        />
      </div>
      <div className="home_vaccine_detail_container">
        {
          vaccineList.map((vaccineInfo, index) => (
            <HospitalInfo
              key={index}
              vaccineInfo={vaccineInfo}
              index={index}
              vaccineList={vaccineList}
            />
          ))
        }

      </div>
    </div>
  )
};


export default Home;

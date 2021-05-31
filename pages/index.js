import { getStateList, getDistricts, getVaccineDetails } from '../util_function';
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const SelectForm = dynamic(() => import('../components/SelectForm'), { loading: () => <div>Loading...</div> });
const HospitalInfo = dynamic(() => import('../components/HospitalInfo'), { loading: () => <div>Loading...</div> });

const Home = () => {

  const [stateList, setStateList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [vaccineSlice, setVaccineSlice] = useState(20);
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterHospital, setFilterHospital] = useState([]);
  const [searchName, setSearchName] = useState('');

  // refs
  const observer = useRef();

  const getState = async () => {
    const response = await getStateList();
    if (response) {
      setStateList(response.states);
    }
  }

  const filterHospitals = () => {
    const filterList = vaccineList.filter(hospital => hospital.name.toLowerCase().includes(searchName.toLocaleLowerCase()));
    setFilterHospital(prevFilterHospital => {
      let filterHospital = prevFilterHospital.slice();
      filterHospital = filterList;
      return filterHospital;
    })
  }

  useEffect(() => {
    getState();
  }, [])

  useEffect(() => {
    filterHospitals()
  }, [searchName])

  const loadMoreHospitalDetail = () => {
    setVaccineSlice(prevVaccineSlice => {
      let vaccineSlice = prevVaccineSlice + 20;
      if (vaccineSlice >= vaccineList.length) setHasMore(false);
      return vaccineSlice;
    });
  }


  const lastHospitalElement = useCallback(element => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreHospitalDetail();
      }
    })

    if (element) observer.current.observe(element);

  });


  const handleStateSelect = async (e, state, type) => {
    state(e.target.value);
    if (type === "state") {
      const response = await getDistricts(e.target.value);
      if (response) {
        setDistrictsList(response.districts);
      }
    }
  }

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVaccineSlice(20);
    setHasMore(true);
    const response = await getVaccineDetails(selectedDistrictCode);
    if (response) {
      setVaccineList((prevVaccineList) => {
        let vaccineList = prevVaccineList.slice();
        vaccineList = response.sessions;
        return vaccineList;
      })
      setLoading(false);
    }
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
          vaccineList.length > 0 &&
          <>
            <input
              type="text"
              className="home_select_search_input"
              name="search"
              placeholder="search"
              onChange={(e) => setSearchName(e.target.value)}
            />
            <div className="home_vaccine_danger_info"><i>*Today's date and current time result is showing.</i></div>
          </>
        }
        {
          vaccineList.length > 0 ?
            (searchName ?
              filterHospital.slice(0, vaccineSlice).map((vaccineInfo, index) => (
                <HospitalInfo
                  lastHospitalElement={lastHospitalElement}
                  key={index}
                  vaccineInfo={vaccineInfo}
                  index={index}
                  vaccineSlice={vaccineSlice}
                  vaccineList={vaccineList}
                />
              )) :
              vaccineList.slice(0, vaccineSlice).map((vaccineInfo, index) => (
                <HospitalInfo
                  lastHospitalElement={lastHospitalElement}
                  key={index}
                  vaccineInfo={vaccineInfo}
                  index={index}
                  vaccineSlice={vaccineSlice}
                  vaccineList={vaccineList}
                />
              ))
            ) : <div className="home_vaccine_info">Select State and district to get vaccine details</div>
        }
      </div>
    </div>
  )
};


export default Home;

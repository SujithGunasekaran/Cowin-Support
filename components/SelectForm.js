

const SelectForm = (props) => {

    const { handleSearchFormSubmit, handleStateSelect, stateList, loading, districtsList, selectedStateCode, selectedDistrictCode, setSelectedStateCode, setSelectedDistrictCode } = props;

    return (
        <form onSubmit={handleSearchFormSubmit}>
            <select
                name="state"
                id="state"
                className="home_select_input"
                onChange={(e) => handleStateSelect(e, setSelectedStateCode, "state")}
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
                onChange={(e) => handleStateSelect(e, setSelectedDistrictCode, "district")}
            >
                {
                    districtsList.length > 0 ? districtsList.map((districtInfo, index) => {
                        {
                            return index === 0 ? <option key={index} value="0">Select District</option> : <option key={index} value={districtInfo.district_id}>{districtInfo.district_name}</option>
                        }

                    }) : <option value="0">Select District</option>
                }
            </select>
            <button disabled={(selectedStateCode && selectedDistrictCode) ? false : true} className={loading ? 'home_select_search_btn_loading' : 'home_select_search_btn'}>{loading ? 'Searching...' : 'Search'}</button>
        </form>
    )

}

export default SelectForm;

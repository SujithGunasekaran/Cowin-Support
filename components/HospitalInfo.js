

const HospitalInfo = (props) => {

    const { vaccineInfo, index, vaccineList } = props;

    return (
        <div>
            <div className="home_vaccine_detail_card">
                <div className="home_vaccine_hospital_container">
                    <div className="home_vaccine_hospital_name_display">
                        <div className="home_vaccine_hospital_name">{vaccineInfo.name}</div>
                        {
                            vaccineInfo.fee_type === "Paid" &&
                            <div className="home_vaccine_hospital_paid">{vaccineInfo.fee_type}</div>
                        }
                    </div>
                    <div className="home_vaccine_hospital_info">{vaccineInfo.address}</div>
                    {
                        vaccineInfo.fee_type === "Paid" &&
                        <div className="home_vaccine_hospital_vaccine">{vaccineInfo.vaccine} : ₹{vaccineInfo.fee}</div>
                    }
                </div>
                <div className="home_vaccine_available_container">
                    {
                        vaccineInfo.available_capacity > 0 ?
                            <>
                                <div className="home_vaccine_first_dose">
                                    Dose1 : {vaccineInfo.available_capacity_dose1} <br />
                          Dose2 : {vaccineInfo.available_capacity_dose2} <br />
                                </div>
                                <div className="home_vaccine_available_dose">{vaccineInfo.available_capacity}</div>
                            </> :
                            <>
                                <div className="home_vaccine_booked">Booked</div>
                            </>
                    }
                    <div className="home_vaccine_available_vaccine_name">{vaccineInfo.vaccine}</div>
                    <div className="home_vaccine_age">Age {vaccineInfo.min_age_limit}+</div>
                </div>
            </div>
            {
                index < vaccineList.length - 1 &&
                <hr className="home_vaccine_hr" />
            }
        </div>
    )

};

export default HospitalInfo;

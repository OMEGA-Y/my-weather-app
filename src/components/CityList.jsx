import CityListHeader from "./CityListHeader";
import "./CityList.css";
function CityList(props) {
  // const cities = props.cities;
  const { cities } = props;

  return (
    <div>
      <CityListHeader />
      <ul className="citylist">
        {cities.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default CityList;

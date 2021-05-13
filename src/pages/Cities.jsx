import { useEffect, useState } from "react";
import CityList from "../components/CityList";

function Cities() {
  const API_URL = "http://riotkr.mockable.io/weather-crawlers/cities";

  const [cityState, setCityState] = useState([]);
  // useState : react package에서 가져온 hook(직접 만든 hook = custom hook)
  // 컴포넌트 안에서 초기값(여기서는 빈 배열)을 잡아놓고,
  // 컴포넌트가 마운트 됐을 때 getCities()를 호출하고
  // getCities()는 await을 하며 데이터를 받아오고
  // setCityState로 cityStater가 빈 배열에서 받아온 배열로 값이 세팅됨

  //hooks
  useEffect(() => {
    console.log("cities component mounted!");
    getCities();
  }, []); // Cities 컴포넌트가 mount 됐을 때 한 번만 실행하기 위해 빈 배열을 두 번째 인자로 넣어줘야 한다.
  // 두 번째 인자로 빈 배열을 생략할 경우 Cities나 이와 연관된 컴포넌트가 변경될 때마다 useEffect()가 실행된다.

  async function getCities() {
    const cities = await fetch(API_URL).then((res) => res.json());
    // .then() 앞에 부분이 promise 객체이다.
    // await을 사용해 비동기를 동기적으로 처리한다.
    // 따라서, promise 객체가 데이터를 모두 받아오면 then이 실행된다.
    // cities 변수는 getCities() 함수 내부 scope으로 제한되어 있다.
    // 따라서, state를 이용해 return 안에서도 변수를 사용할 수 있도록 state에 값을 저장한다.
    console.log(cities);

    setCityState(cities);
  }

  return (
    <div>
      <h1>Cities</h1>
      <p>{API_URL}</p>
      <CityList cities={cityState} />
    </div>
  );
}

// <div>{JSON.stringify(cityState)}</div>
// 초기에는 빈 배열로 보여짐
// 배열을 바로 읽어서 쓸 거니까 안전하게 JSON으로 변환해서 사용

export default Cities;

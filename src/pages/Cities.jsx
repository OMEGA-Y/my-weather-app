import { useEffect, useState } from "react";
import CityList from "../components/CityList";

function Cities() {
  const API_URL = "http://riotkr.mockable.io/weather-crawlers/cities";

  const [cityState, setCityState] = useState([]);
  // useState : react package에서 가져온 hook(직접 만든 hook = custom hook)
  // 컴포넌트 안에서 초기값(여기서는 빈 배열)을 잡아놓고,
  // 컴포넌트가 마운트 됐을 때 getCities()를 호출하고
  // getCities()는 await을 하며 데이터를 받아오고
  // setCityState로 cityState가 빈 배열에서 받아온 배열로 값이 세팅됨

  //hooks
  useEffect(() => {
    console.log("cities component mounted!");
    getCities();
  }, []); // Cities 컴포넌트가 mount 됐을 때 한 번만 실행하기 위해 빈 배열을 두 번째 인자로 넣어줘야 한다.
  // 두 번째 인자로 빈 배열을 생략할 경우 Cities나 이와 연관된 컴포넌트가 변경될 때마다 useEffect()가 실행된다.

  async function getCities() {
    const cities = await fetch(API_URL).then((res) => res.json());
    // .then() 앞에 부분이 promise 객체이다.
    // async/await을 사용해 비동기를 동기적으로 처리한다.
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

// 비동기와 프라미스
// API서버에서 외부데이터를 가져올 때 데이터가 가공이 되고 내 애플리케이션으로 돌아오는데 시간이 걸린다.
// 자바스크립트가 fetch를 실행은 시키지만 결과가 올 때까지 기다리지는 않는다.
// fetch라는 메소드가 프라미스 객체이다.
// 비동기이므로 cities는 데이터를 받아오는게 아니라 프라미스 객체를 받게 된다.
// ES6부터 nested구조로 작성하지 않고 async/await을 사용함으로써 flat한 형태로 작성할 수 있게 되었다.

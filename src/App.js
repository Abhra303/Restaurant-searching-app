import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
// import Restaurents from './components/Restaurents';
import Wrapper from "./components/Wrapper";
import mapboxgl from 'mapbox-gl';
import {zomatoKey} from './keys';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Form.css';
import Tv from './components/Tv';


function App() {
  const [restaurant, onRestaurantChange] = useState("");
  const [location, onLocationChange] = useState("");
  const [food, onFoodChange] = useState('');

  let city_id = '';
  const [resultList,setResultList] = useState([]);

  const handleRestaurantChange = id => {
    onRestaurantChange(id);

  };

  const handleLocationChange = id => {
    onLocationChange(id);
  };

  const handleFoodChange = id => {
    onFoodChange(id);
  };

  useEffect(() => {
    if (location && food) {
      fetch(`https://developers.zomato.com/api/v2.1/cities?q=${location}`, {
        headers: {
          'user-key': zomatoKey
        }
      }).then(res => {
        return res.json();
      }).then(result => {
        if (result['location_suggestions'].length === 0) {
          city_id = '';
          alert('result empty');
        }
        else{
          city_id = result['location_suggestions'][0].id;
          console.log('valid city id',city_id);
          if (city_id){
            console.log('result fetch');
            fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${city_id}&entity_type=city&cuisines=${food}`, {
            headers: {'user-key': zomatoKey}
          }
            ).then(res => {
              return res.json();
            }).then(result =>{
              setResultList(result['restaurants']);
              console.log('resultList success!',resultList);
            })
          }
        }
      });
    }
      // if(restaurant)


  }, [restaurant, location, food]);


  return (
    <div className="App">
      <div className='heading'><h1>Search the best restaurent that suits you ...</h1>
        <Form
          onRestaurantChange={handleRestaurantChange}
          onLocationChange={handleLocationChange}
          onFoodChange={handleFoodChange}
        />
      </div>
      <div className='worker'>
        {/* <Restaurents /> */}
        <Wrapper resultList={resultList} />
        <div className='tv-wrapper'>
          <Tv resultList={resultList}/>
        </div>
      </div>
    </div>
  );
}

export default App;

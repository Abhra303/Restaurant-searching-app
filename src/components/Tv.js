import ReactMapGl, { Marker } from "react-map-gl";
import {useState} from "react";
import location from "../location.png";
import {mapboxToken} from '../keys';

export default function(props) {

    const [viewPort, setViewPort] = useState({
        width: "100%",
        height: "100%",
        latitude: 0,
        longitude: 0,
        zoom: 2
    });

    // console.log('Hello from tv!', props.resultList);
    return (
        
        <div className='tv'>
            <ReactMapGl 
              {...viewPort} 
              mapboxApiAccessToken= {mapboxToken}
              onViewportChange={viewPort => {
                setViewPort(viewPort);
              }}
            >
                {
                    props.resultList?
                        props.resultList.map(elem => (
                            <Marker 
                                key={elem.restaurant.id} 
                                latitude={parseFloat(elem.restaurant.location.latitude)}
                                longitude={parseFloat(elem.restaurant.location.longitude)}
                            >
                                    <div>
                                        <img src={location} width='22px' alt={elem.restaurant.name}/>
                                    </div>
                            </Marker>
                        ))
                        :
                        null
                }
            </ReactMapGl>
        </div>
    );
}

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
function Restaurents(props) {

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={50}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {  
                props.resultList?
                props.resultList.map(elem => (
                <SwiperSlide key={elem.restaurant.id}>
                    <div className='wrapit'>
                        <div className='restaurent-cart'>
                            <div className='restaurent-info'>
                                <h1><a href={elem.restaurant.url} target='_blank'>{elem.restaurant.name}</a></h1>
                                <p>{elem.restaurant.user_rating.aggregate_rating}   {elem.restaurant.user_rating.rating_text}</p>
                                <p>{elem.restaurant.location.address} {elem.restaurant.location.locality}</p>
                                <p>{elem.restaurant.location.city}</p>
                            </div>
                            <img src={elem.restaurant.featured_image} />
                        </div>
                    </div>
                </SwiperSlide>
                ))
                :
                (<div className='wrapit'>
                        <div className='restaurent-cart'>
                            <div className='restaurent-info'>
                                <h1>No result found</h1>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </Swiper>
    )
}

export default Restaurents;

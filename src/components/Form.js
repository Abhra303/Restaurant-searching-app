import React from 'react';
import {zomatoKey} from '../keys';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            foodList: [],
            // restaurentList: [],
        };
    }


    //fetch the api after mounting the component
    // componentDidMount() {
        
        // fetch('', {
        //     headers: {}
        // }).then((res) => {
        //     return res.json();
        // }).then((result) => {
        //     this.setState({ restaurentList: result });
        // });
        // fetch('',{
        //     headers:{}
        // }).then((res)=>{
        //     return res.json();
        // }).then((result) =>{
        //     this.setState({foodList: result});
        // });

    // }
    handleLocation = (e)=>{
        this.setState({location: e.target.value});

        let city_id;
        if(this.state.location){
            fetch(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.location}`, {
                headers: {
                  'user-key': zomatoKey
                }
              }).then(res => {
                return res.json();
              }).then(result => {
                if (result['location_suggestions'].length === 0) {
                  city_id = '';
                  console.log('empty input')
                }
                else{
                  city_id = result['location_suggestions'][0].id;
                  console.log('valid city id',city_id);
                  if (city_id){
                    console.log('result fetch');
                    fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${city_id}`,{
                        headers: {
                            'user-key': zomatoKey
                        }
                    }).then(res =>{
                        return res.json();
                    }).then(result =>{
                        console.log(result);
                        if(result['cuisines'].length !== 0){
                            let obj = {};
                            result['cuisines'].forEach(element => {
                                obj[element.cuisine.cuisine_name] = element.cuisine.cuisine_id;
                            });
                            console.log('success !');
                            this.setState({foodList: obj});
                        }
                        else{
                            console.log('no results found...');
                        }
                    })
                    
                  }
                }
              });
        }
        else{
            console.log('fill the location first!');
        }

    }
    


    render() {
        console.log(this.state.foodList);
        return (
            <form action='#' >
                <input list='locations' name='location' id='location' placeholder='Location' onChange={this.handleLocation} />
                <datalist id='locations'>
                    <option value='Bangkok' />
                    <option value='Paris'  />
                    <option value='London'  />
                    <option value='Dubai'  />
                    <option value='Singapore'  />
                    <option value='Kuala Lumpur'  />
                    <option value='New York City'  />
                    <option value='Istanbul'  />
                    <option value='Tokyo'  />
                    <option value='Antalya'  />
                    <option value='New Delhi'  />
                    <option value='Kolkata'  />
                    <option value='Bengaluru'  />
                    <option value='Mumbai'  />
                </datalist>

                <input list='foods' name='food' id='food' placeholder='Food-type' />
                <datalist id='foods'>
                    {
                        Object.keys(this.state.foodList).map(elem => (
                            <option value={elem} />
                        ))
                    }
                </datalist>
                <input list='restaurents' name='restaurent' id='restaurent' placeholder='Restaurent' />
                <datalist id='restaurents'>
                    {
                        // this.state.restaurentList.map(elem => {
                        //     <option value={elem} />
                        // })
                    }
                </datalist>
                <input type='submit' value='SUBMIT' id='submit' onClick={(e) => {
                    e.preventDefault();
                    console.log('submitting the form')
                    const value = document.getElementById('location').value;
                    const value1 = document.getElementById('restaurent').value;
                    const value2 = document.getElementById('food').value;
                    console.log('values are ',value);
                    const foodTypeId = this.state.foodList[value2];
                    this.props.onLocationChange(value);
                    this.props.onRestaurantChange(value1);
                    this.props.onFoodChange(foodTypeId);
                }} />

            </form>
        );
    }


}


export default Form;
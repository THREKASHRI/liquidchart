import React from 'react';

class MainComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			obj : []
		};
		this.getData = this.getData.bind(this);
		this.getResturantDataFromZomato = this.getResturantDataFromZomato.bind(this);
		this.getIdFromLocation = this.getIdFromLocation.bind(this);
	}
	getIdFromLocation(location, cuisine){
		$.ajax({
			 url:"https://developers.zomato.com/api/v2.1/locations?query="+location,
			 type:'GET',
			 beforeSend: function (request)
									 {
											 request.setRequestHeader("user-key", "46a2eab73fc526624bab1d5a65c8001a");
									 },
			success: function(data)
			{
				console.log('Successfully got JSON from Zomato' + data);
				console.log(JSON.stringify(data,undefined,2));
				this.getResturantDataFromZomato(data.location_suggestions[0].entity_id, cuisine);
			}.bind(this),
			error: function(err)
			{
				console.log('error occurred on AJAX');
				console.log(err);
			}.bind(this)
		});
	}
	getResturantDataFromZomato (location, cuisine) {
			// let mainTHIS = this;
			console.log('cuisine',cuisine);
		  $.ajax({
		     url:"https://developers.zomato.com/api/v2.1/search?entity_id="+location+"&entity_type=city&q="+cuisine+"&count=12",
		     type:'GET',
		     beforeSend: function (request)
		                 {
		                     request.setRequestHeader("user-key", "46a2eab73fc526624bab1d5a65c8001a");
		                 },
		    success: function(data)
		    {
		      console.log('Successfully got JSON from Zomato' + data);
					console.log(JSON.stringify(data,undefined,2));
					this.getData(data.restaurants);
					// this.setState({
					// 	obj: data.restaurants
					// });
		    }.bind(this),
		    error: function(err)
		    {
		      console.log('error occurred on AJAX');
		      console.log(err);
		    }.bind(this)
			});
	}
	getData(data){
			this.setState({
				obj : data
			});
	}

	render () {
		return (
			<div>
				<Child restaurantData={this.getIdFromLocation.bind(this)}/>
				<GrandChild requiredData={this.state.obj}/>
				</div>
		);
	}
}
//
// ReactDOM.render (
// 	<MainComponent/>, document.getElementById('mountapp')
// );
module.exports = MainComponent;

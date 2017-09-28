import React, { Component }from 'react';
import StaticCardStructure from './staticCardStructure';
import {Card} from 'semantic-ui-react';
class serviceCard extends React.Component{
  constructor(){
    super();

  }
  render(){
    console.log('ssssss',this.props.staticCards);
     let staticCard =this.props.staticCards;
let score = this.props.penaltyscore;
let totalteamscore = this.props.totalteamscore;
     console.log(staticCard.length);
     let arr = this.props.staticCards.map(function(item){
       console.log('myitem',item);
       console.log('servicena'+item.serviceName);
       console.log('descreption'+item.description);
     return(
       <div>
       <StaticCardStructure serviceName ={item.serviceName} description ={item.description} cost ={item.cost} score={score} totalteamscore={totalteamscore}
       />
       </div>
     )
   }
   )
   console.log('d'+arr.length);
    return(

      <div>
      <Card.Group itemsPerRow={2}>
       {arr}
       </Card.Group>
      </div>

    )
  }
}
module.exports = serviceCard;

import React, { Component }from 'react';
import FlipCardStructure from './flipCardStructure';
import {Card} from 'semantic-ui-react';
class flipCard extends React.Component{
  constructor(){
    super();

  }
  render(){
     let flipCard =this.props.dynamicCards;
     console.log(flipCard.length);
let score = this.props.penaltyscore;
console.log('flipcard score',this.props.penaltyscore);
     let arr = flipCard.map(function(item){
       console.log('myitemaaa'+item.serviceName);
console.log('myitem cost'+item.cost.value);
     return(
       <div>
       <FlipCardStructure serviceName ={item.serviceName} description = {item.description}  cost ={item.cost} score={score}/>
       </div>
     )
   }
   )
   console.log('d'+arr.length);
    return(

      <div>

       {arr}

      </div>

    )
  }
}
module.exports = flipCard;

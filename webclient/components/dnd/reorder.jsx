import React, {Component} from 'react';
import {render} from 'react-dom';

// Components
import DragSortableList from 'react-drag-sortable';
import Card from './card';

var listGrid = [];

export default class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: props.allCards
    };
  }

  remove(position) {
    var cards = this.props.allCards;
    cards.splice(position, 1);
    this.props.changeCard(cards);
    this.setState({allCards: this.props.allCards});
  }

  onSort(sortedList) {
    let allCards = [];
    console.log("sortedList", sortedList);
    sortedList.map((item, index) => {
      var x = item.content.props.children.props;
      allCards.push({
        cardColor: x.cardColor,
        category: x.category,
        checked: x.checked,
        description: x.description,
        id: x.id,
        name: x.name
      })
    })
    this.setState({
      allCards: allCards
    }, function() {
      this.props.changeCard(this.state.allCards);
    })
  }

  render() {
    var listGrid = [];
    // console.log('allCards',this.props.allCards);
    this.props.allCards.map((item, index) => {
      listGrid.push({content: (
          <div style={{
            padding: '5px'
          }}>
            <Card id={item.id} checked={item.checked} category={item.category} errorMsg={item.errorMsg} cardColor={item.cardColor} name={item.name} description={item.description} place='right' remove={this.remove.bind(this)} position={index}/>
          </div>
        )})
    })
    return (
      <div style={{margin:'auto'}}>
        <DragSortableList items={listGrid} dropBackTransitionDuration={0.3} onSort={this.onSort.bind(this)} type="grid"/>
      </div>
    )
  }
}

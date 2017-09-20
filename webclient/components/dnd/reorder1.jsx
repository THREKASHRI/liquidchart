  import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Card from './card';
import {Button} from 'semantic-ui-react';

var SortableItem = SortableElement(({
  name,
  remove,
  position,
  description,
  cardColor,
  errorMsg,
  category,
  checked
}) => <div style={{
  padding: '5px'
}}><Card checked={checked} category={category} errorMsg={errorMsg} cardColor={cardColor} name={name} description={description} place='right' remove={remove} position={position}/></div>);

var SortableList = SortableContainer(({items, remove}) => {
  return (
    <div>
      {items.map(function(value, index) {
        value.position = index;
        return (<SortableItem key={`item-${index}`} index={index} position={value.position} checked={value.checked} category={value.category} cardColor={value.cardColor} errorMsg={value.errorMsg} description={value.description} name={value.name} remove={remove}/>)
      })
}
    </div>
  );
});

export default class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.allCards
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  remove(position) {
    var cards = this.props.allCards;
    cards.splice(position, 1);
    this.props.changeCard(cards);
    this.setState({items: this.props.allCards});

  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({items: this.props.allCards})
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
    this.props.changeCard(this.state.items);
  };

  render() {
    return (
      <div>
        <SortableList items={this.props.allCards} onSortEnd={this.onSortEnd} remove={this.remove.bind(this)}/>
      </div>
    );
  }
}

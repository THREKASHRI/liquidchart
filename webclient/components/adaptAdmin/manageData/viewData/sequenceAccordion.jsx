import React from 'react'
const {hashHistory} = require('react-router');
import {Accordion, Segment } from 'semantic-ui-react'
class SequenceAccordion extends React.Component {
  constructor() {
    super();
  }
  render() {
    var i = 0,
    j = -1;
    var k=0;
    var arr = this.props.correctSequence;

    if(arr[0] == undefined || arr[0] == ''){
      arr.shift();
    }
      //console.log('in child seq acc'+JSON.stringify(arr));
    var length = arr.length;
    //console.log(arr.length);
    function problemStatement() {
      let seqTitle = 'Sequence';
      while (i < arr.length) {
        ++i;
        return seqTitle+' '+i;
      }
    }
    let a = 0;
    function problemDescription() {
      let b = 0;
      let m = 1;
      let data = '';
      if(arr.length >  0){
        //console.log('sequence'+JSON.stringify(arr[a]));
        let arrData = arr[a];
        var mapData = arrData.map(function(item) {
          //console.log('item',item);
          return (<li style={{textAlign:"left",color:"black"}}>{item.header}</li>);
        });
        //console.log('aaaa',mapData);
        a++;
      }
      return (
        <div><ol>{mapData}</ol></div>
      );
    }
    const panels = _.times(arr.length , () => ({title: problemStatement(), content: problemDescription()}));
    let container = <Accordion panels={panels} styled fluid/>;
    return (
      <div id="Sequence" style={{marginTop:"30%",textAlign:"left"}}>
        {this.props.correctSequence != ''
        ?
        <Segment>

          {container}
        </Segment>:null}

      </div>
    );
  }
}



module.exports = SequenceAccordion;

import React from 'react';
import { Card, Header, Segment,Grid} from 'semantic-ui-react';
import FlipCard from './flipCard';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
import StaticCards from './staticCards';
const cookies = new Cookies();
class Helpdesk extends React.Component {
  constructor() {
      super();
this.state = {
dynamicCards:[],
staticCards:[],
teamName:'',
}
this.getServicesCost =this.getServicesCost.bind(this);
this.teamscore = this.teamscore.bind(this);
this.getallData = this.getallData.bind(this);
}
componentWillMount()
{

  this.getServicesCost();
  this.teamscore();
this.getallData();

}

getServicesCost(){

  let context = this;
  let catalogue1 =[];
  let dynamicCards1 =[];
  let staticCards1 = [];
  let sessionName ='session1';
  $.ajax({
    url:'/helpDesk/getServicesCost',
    type:'POST',
    data:{name:'session1'},
    success: function(data1){
      console.log('ccccccccccccccccc'+data1);
      context.setState({
         catalogue:data1
      },function(){
         console.log(this.state.catalogue);
           catalogue1 = this.state.catalogue;
         catalogue1.map((item)=>{
           console.log("map",item);
           console.log('assssdd'+ item.description);
           if(item.serviceName == 'Sequence Ordered'|| item.serviceName == 'UserStory Closure' || item.serviceName == 'Sequence Unordered')
           {
                      dynamicCards1.push(item);
                    console.log('ddynamiccards'+dynamicCards1);

           console.log("gh"+this.state.dynamicCards.push(item));
           }
           else{
             staticCards1.push(item);
             console.log('staticacards',staticCards1);
            //  console.log(this.state.staticCards.push(item));
           }
           context.setState({dynamicCards:dynamicCards1,staticCards:staticCards1},function(){
             console.log(context.state.dynamicCards,"###",context.state.staticCards);
           });
         }
       )

      }
    );

    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
    }.bind(this)
  })
}
getallData() {
  let a = cookies.get('empId');
  let context = this;
    $.ajax({
        url:'/profile/view',
        type:'POST',
        data:{empId:a,
        userName: cookies.get('username'),
        userType: cookies.get('userType')},
        success:function(data){
            context.setState({
                teamName:data[0].teamName
            })
            },
            error: function(err){
   }});
}
teamscore() {
  let context = this;
  console.log("before ajax of team score");
  $.ajax({
    url:'/userDashboard/getTeamSc',
    type:'POST',
    async:false,
    data:{team:cookies.get('teamName')},
    success: function(data1)
    {
      //console.log('team scores with score',data1);
      context.setState({
        score: parseInt(data1)
      });

    }.bind(this),
    error: function(err)
    {
      ////console.log('error occurred on AJAX');
    }.bind(this)
  });
  $.ajax({
    url:'/users/getTeamScore',
    type:'POST',
    async:false,
    data:{teamName:cookies.get('teamName')},
    success: function(data1)
    {
      //console.log('team scores with score',data1.records[0]._fields[0].low);
      context.setState({
        teamScore: data1.records[0]._fields[0].low
      });

    }.bind(this),
    error: function(err)
    {
      ////console.log('error occurred on AJAX');
    }.bind(this)
  });
}

render(){
let totalscore= this.state.score - this.state.teamScore;
console.log("helpdesk team score",this.state.teamScore);
console.log('totalscore',totalscore);
  return(
<div style={{marginTop:'4%'}}>
<Grid>
<Grid.Column width={3}>
<div  className="col-padding colPaddingInProfile" style={{marginLeft:'30%'}}>
              <button data-toggle="modal" data-target="#TeamName" type="button" id = "twoButtonInProfile" className="outline btn btn-circle btn-xl circleButton">
                <br/>
                Team name
                <p style={{textAlign:'center'}}>{this.state.teamName}</p>
                Score
                <p style={{textAlign:'center'}}>{totalscore}</p>
              </button>
            </div>
</Grid.Column>
<Grid.Column width={5}>
    {this.state.dynamicCards.length > 0 ? <FlipCard dynamicCards ={this.state.dynamicCards} penaltyscore={this.state.teamScore}/>: null}
    </Grid.Column>
    <Grid.Column floated='right' width={8} style={{marginTop:'2%',marginLeft:'-3%'}}>
      {this.state.staticCards.length >0 ? <StaticCards staticCards ={this.state.staticCards} penaltyscore={this.state.teamScore}/> : null}
    </Grid.Column>



</Grid>
</div>
  );
}
}
module.exports = Helpdesk;

import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';

export default class AssignedDevice extends React.Component {

  componentDidMount(){
      $.ajax({
          type: 'GET',
          datatype: 'json',
          url: Constants.BACKEND_URL +'/assignments/'+ this.getAssignmentId()
      }).done((data) => {
        console.log(data);
          this.setState({assignment:data});
      }).fail(() => {
          this.setState({assignment:{}})
      });
  }

  getAssignmentId(){
    return this.props.params.assignmentId;
  }

  constructor(props) {
    super(props);
    this.state = {
        assignment: {}
    };
    this.getAssignmentId=this.getAssignmentId.bind(this);
  }

  render() {
    return(
      <div>
        Proyecto: {this.state.assignment.project_name}
      </div>      
    )
  }

}

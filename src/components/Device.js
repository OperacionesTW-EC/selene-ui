import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';

export default class Device extends React.Component {

    constructor(props){
        super(props);
        this.state = {device :{}}
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/devices/'+ this.props.params.id
        }).done((data) => {
            this.setState({device: data});
        }).fail(() => {
            this.setState({device:{}})
        });
    }

    render(){
        return(
            <div>Hello!!!</div>
        )
    }
}
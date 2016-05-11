import React from 'react'

export default class Message extends React.Component {

    constructor(props){
        super(props);
        this.state = {type: props.type, content: props.content}
    }

    render(){
        return <div className={'message ' + this.state.type + '-message'}>{this.state.content }</div>
    }

}
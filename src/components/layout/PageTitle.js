import React from 'react';

export default class PageTitle extends React.Component{

    constructor(props){
        super(props);
        this.state = {content: props.content};
    }

    render(){
        return (
            <div className="paper page-header">
                <div className="container-fluid">
                    <h1>{this.state.content}</h1>
                </div>
            </div>
        )
    }

}

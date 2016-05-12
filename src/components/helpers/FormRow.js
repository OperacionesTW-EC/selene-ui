import React from 'react';

export default class FormRow extends React.Component{

    constructor(props){
        super(props);
        this.state = {label :props.label, rowClass: props.rowClass || 'margin'};
        this.renderLabel = this.renderLabel.bind(this);
    }

    render(){
        return (
            <div className={'row '+this.state.rowClass}>
                {this.renderLabel()}
                <div className="col-md-12">
                    {this.props.children}
                </div>
            </div>
        )
    }

    renderLabel(){
        if(this.state.label){
            return (
                <div className="col-md-12">
                    <label>{this.state.label}</label>
                </div>
            )
        }
    }
}
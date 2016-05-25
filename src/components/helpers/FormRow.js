import React from 'react';

export default class FormRow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            label :props.label,
            rowClass: props.rowClass || 'margin',
            labelColumnClass: props.labelColumnClass || 'col-md-12',
            fieldColumnClass: props.fieldColumnClass || 'col-md-12'
        };
        this.renderLabel = this.renderLabel.bind(this);
    }

    render(){
        return (
            <div className={'row '+this.state.rowClass}>
                {this.renderLabel()}
                <div className={this.state.fieldColumnClass}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    renderLabel(){
        if(this.state.label){
            return (
                <div className={this.state.labelColumnClass}>
                    <label>{this.state.label}</label>
                </div>
            )
        }
    }
}
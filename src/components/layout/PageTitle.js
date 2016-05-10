import React from 'react';

class PageTitle extends React.Component{

    constructor(props){
        super(props);
        this.state = {content: props.content};
    }

    render(){
        return (
            <div className="page-title">
                <div className="container">
                    <h1>{this.state.content}</h1>
                </div>
            </div>
        )
    }

}
export default PageTitle;
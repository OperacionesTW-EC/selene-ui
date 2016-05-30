import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './Home';
import MessageHelper from './helpers/MessageHelper';
import Constants from './../config/Constants';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            message: new MessageHelper()
            };
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(message,type)
    {
        switch(type){
            case Constants.MESSAGE_TYPE.OK:
                this.state.message.buildSuccessMessage(message);
                break;
            case Constants.MESSAGE_TYPE.ERROR:
                this.state.message.buildErrorMessage(message);
                break;
            case Constants.MESSAGE_TYPE.INFO:
                this.state.message.buildInfoMessage(message);
                break;
            default :
                this.state.message.buildSuccessMessage();
                break;
        }
        let context = this;
        context.setState({});
        setTimeout(function () {
            context.setState({message: new MessageHelper()});
        },3000)
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                setMessage: this.setMessage
            })
        );
        return (
            <div>
                <Navbar />
                {this.state.message.renderMessage()}
                <section>
                    {childrenWithProps || <Home/>}
                </section>
                <Footer />
            </div>
        )
    }
}

export default App;

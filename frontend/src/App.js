import './index.css';
import React, { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonLabel: "Connect",
            data: null
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        console.log('Handling button click');

        fetch('http://localhost:2999/welcome')
            .then(response => response.json())
            .then(data => {
                console.log('data: %s', data)

                const parsedData = JSON.parse(data)
                const label = parsedData.label;
                this.setState({ data: label})
            })
            .then(this.setState({ buttonLabel: "Connected"}))
            .catch(error => {
                console.error(error);
                
                return { name: "network error", description: ""};
            });
    }

    render() {
        return (
            <div>
                <h1>
                    Expense Manager
                </h1>
                <button
                    className='connect_button'
                    onClick={ this.handleButtonClick }>
                        { this.state.buttonLabel }
                </button>
                <p>
                    <b>Received data</b>: { this.state.data }
                </p>
            </div>
        )
    }
};

export default App;

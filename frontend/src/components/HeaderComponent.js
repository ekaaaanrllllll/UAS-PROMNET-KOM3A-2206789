import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark">
                        {}
                        <div>
                            <a href="/users" className="navbar-brand" style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>
                                INVENTORY KEI TECH
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;

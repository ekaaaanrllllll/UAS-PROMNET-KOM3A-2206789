import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <footer className="footer">
                <div className="container text-center">
                    <span className="text-muted">
                        &copy; Eka Nurul 2206789 ʚ♡ɞ. All Rights Reserved.
                    </span>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;

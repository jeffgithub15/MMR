import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button } from 'react-bootstrap';

export default class AlertMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }
    close() {
        this.setState({ showModal: false });
        this.props.alertHandler(true);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ showModal: nextProps.showModal });
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>ALERT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            BOOM! Task Completed!
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

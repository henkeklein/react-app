
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './2fa.css';
import { makeLogin2fa } from "../request/Requests";

interface myProps {
    username: string,
    password: string
}

export default class Dashboard extends React.Component<myProps> {
    private show: boolean = true;
    private code: any = '';
    constructor(props: myProps | Readonly<myProps>) {
        super(props);
    }

    async checkCode (event: any) {
        this.setState({value: event})
        if (event.length === 6) {
            this.show = false;
            let data = await makeLogin2fa({username: this.props.username, password: this.props.password, token: event});
            if(data.id) {
                console.log('LOGGED IN');
                localStorage.setItem('$LoopBack$accessTokenId', data.id);
            }
        }
    }
    handleClose = () => {
        this.show = false;
    };
    render() {
        return (
            <>
                <Modal
                    show={this.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={true}
                    size="sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Multi factor authentication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control className="inputCode"

                            autoFocus
    
                            onChange={(e) => this.checkCode(e.target.value)}
    
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Login</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './2fa.css';

export default function MFA(username: any, password: any) {
    const [code] = useState("");
    let checkCode = function (event:any) {
        console.log(event);
    }
    return (
        <div>
            <Form>

                <Form.Group controlId="code">

                    <Form.Label>Username</Form.Label>

                    <Form.Control className="inputCode"

                        autoFocus

                        value={code}

                        onChange={(e) => checkCode(e.target.value)}

                    />

                </Form.Group>

            </Form>
        </div>
    )
}
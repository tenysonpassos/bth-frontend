import React, { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';

export default function Footer() {
    return(
        <Container>
            <Row>
                <Col className="footer-bth">
                <span>Copyright 2020 - Be The Hero</span>
                </Col>
            </Row>
        </Container>
    );
}
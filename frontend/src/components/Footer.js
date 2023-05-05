/*eslint-disable no-undef */

import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

function Version() {
  return (
    <>
      {COMMIT_HASH}-{COMMIT_BRANCH}
    </>
  );
}

export function Footer() {
  return (
    <Container fluid className="footer">
      <Row>
        <Col className="text-end">
          <Version/>
        </Col>
      </Row>
    </Container>
  )
}
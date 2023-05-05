/*eslint-disable no-undef */

import React from 'react';
import {Container} from 'react-bootstrap';

function Version() {
  return (
    <div id="version-info">
      <a href={REPO_URL + '/commit/' + COMMIT_HASH}
         target='_blank'
         rel='noreferrer'
      >{COMMIT_HASH}</a>-{COMMIT_BRANCH}
    </div>
  );
}

export function Footer() {
  return (
    <Container fluid>
      <footer className="footer">
          <Version/>
      </footer>
    </Container>
  )
}
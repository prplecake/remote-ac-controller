/*eslint-disable no-undef */

import React from 'react';
import {Container} from 'react-bootstrap';

const repoUrl = process.env.REPO_URL;
const hash = process.env.COMMIT_HASH;
const branch = process.env.COMMIT_BRANCH;

function Version() {
  return (
    <div id="version-info">
      <a href={repoUrl + '/commit/' + hash}
         target='_blank'
         rel='noreferrer'
      >{hash}</a>-{branch}
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
import React from 'react';
import './Header.scss';

import Form from 'react-bootstrap/Form'

function Header(props) {
  const filter = (method, e) => {
    const keyword = e.target.value;
    props[method](keyword)
  }

  return (
    <header className="App-header">
      <div className="container">
        <div className="Filters">
          <Form.Select size="sm" onChange={(e) => filter('sendSelectGender', e)}>
            <option value="">All Genders</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </Form.Select>

          <Form.Select size="sm" onChange={(e) => filter('sendSelectParty', e)}>
            <option value="">All Parties</option>
            <option value="D">Democratic</option>
            <option value="R">Republican</option>
          </Form.Select>

          <Form.Select size="sm" onChange={(e) => filter('sendSelectNextElection', e)}>
            <option value="">All Years</option>
            {props.nextElectionYears.map(
              year => <option key={year} value={year}>{year}</option>
            )}
          </Form.Select>

          <Form.Select size="sm" onChange={(e) => filter('sendSelectChamber', e)}>
            <option value="senate">Senate</option>
            <option value="house">House</option>
          </Form.Select>

          <Form.Select size="sm" value={props.session} onChange={(e) => filter('sendSelectSession', e)}>
            {props.sessions.map(
              session => <option key={session} value={session}>{session}</option>
            )}
          </Form.Select>
        </div>

        <Form.Control
          size="sm"
          type="search"
          onChange={(e) => filter('sendSearchWord', e)}
          className="Search-input"
          placeholder="Search..."
        />
      </div>
    </header>
  );
}

export default Header;

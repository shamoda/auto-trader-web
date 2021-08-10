import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ placeholder }) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl placeholder={placeholder} />
      </InputGroup>
    </div>
  );
}

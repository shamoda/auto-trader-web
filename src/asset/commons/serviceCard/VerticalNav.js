import React from 'react';
import { ListGroup } from 'react-bootstrap';

function VerticalNav({ title, category1, category2, category3, category4 }) {
  return (
    <div>
      <ListGroup as="ul" style={{ width: '80%' }}>
        <ListGroup.Item
          as="li"
          style={{ backgroundColor: '#000', color: '#fff' }}
        >
          {title}
        </ListGroup.Item>
        <ListGroup.Item as="li">{category1}</ListGroup.Item>
        <ListGroup.Item as="li">{category2}</ListGroup.Item>
        <ListGroup.Item as="li">{category3}</ListGroup.Item>
        <ListGroup.Item as="li">{category4}</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default VerticalNav;

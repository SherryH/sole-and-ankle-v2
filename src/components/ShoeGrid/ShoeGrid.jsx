import React from 'react';
import styled from 'styled-components';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

// better to separate the spacing concern from the card design
// to preserve separation of concerns
const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeWrapper>
          <ShoeCard key={shoe.slug} {...shoe} />
        </ShoeWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* gap: 2em; */
  /** if not using gap, we can use margin. -ve margin here to match heading alignment */
  display: flex;
  flex-wrap: wrap;
  margin: -16px;
`;

const ShoeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /** to grow/ shrink the card size to fit the extra spaces when window resize */
  flex-basis: 250px;
`;

export default ShoeGrid;

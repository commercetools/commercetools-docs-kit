import React from 'react';
import Provider from '../../provider';

const Wrapper = props => {
  return (
    <Provider>
      <div {...props} />
    </Provider>
  );
};

export default Wrapper;

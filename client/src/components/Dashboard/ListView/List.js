import React from 'react';
import { InnerListBox } from '../../utils/sharedStyles';

const ListView = ({ selectedList }) => (
  <InnerListBox>
    {selectedList.map(({ inventoryItem, _id }) => (
      <h5 key={_id}>{inventoryItem}</h5>
    ))}
  </InnerListBox>
);

export default ListView;

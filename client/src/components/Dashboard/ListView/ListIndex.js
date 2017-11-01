import React from 'react';
import { InnerListBox } from './utils/sharedStyles';
import styled from 'styled-components';

const ListHeader = styled.div`
  display: inline-block;
  width: 13rem;
  background-color: ${({ list, selectedList }) =>
    list === selectedList ? 'rgba(0, 0, 0, 0.1)' : 'none'};
  border-radius: 2%;
  box-sizing: border-box;
  margin-bottom: 1.2rem;
  border-radius: 1%;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
  h4 {
    margin-bottom: 0.65rem;
  }
  p + p {
    margin-bottom: 0;
  }
`;

const ListIndex = ({ lists, onSelectList, selectedList }) => (
  <InnerListBox>
    {lists.map(({ title, _id, list, dateCreated }) => (
      <ListHeader
        key={_id}
        onClick={() => onSelectList(list)}
        list={list}
        selectedList={selectedList}
      >
        <h4>{title}</h4>
        <p>Created on: {new Date(dateCreated).toLocaleDateString()}</p>
        <p>Contains {list.length} items</p>
      </ListHeader>
    ))}
  </InnerListBox>
);

export default ListIndex;

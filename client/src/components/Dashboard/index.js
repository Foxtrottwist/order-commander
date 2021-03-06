import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import ListView from './ListView';
import UserIndex from './UserIndex';
import * as actions from '../../actions';

const DashboardBox = styled.div`
  display: flex;
  align-items: center;
`;

class Dashboard extends Component {
  state = { selectedList: [] };

  componentWillMount() {
    const { history } = this.props;
    this.props.fetchUsers(history);
    this.props.fetchInventoryLists(history);
  }

  render() {
    return (
      <div style={{ marginTop: '1.7rem' }}>
        <DashboardBox>
          {!this.props.users ? null : <UserIndex users={this.props.users} />}
          {!this.props ? null : (
            <ListView
              lists={this.props.inventoryLists}
              onSelectList={list => this.setState({ selectedList: list })}
              selectedList={this.state.selectedList}
            />
          )}
        </DashboardBox>
      </div>
    );
  }
}

function mapStateToProps({ users, inventoryLists }) {
  return { users, inventoryLists };
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard));

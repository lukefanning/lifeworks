'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import HistoryItem from './HistoryItem'

class History extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.list.scrollTop = this.list.scrollHeight;
  }
  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }
  render() {
    const { currency, transactions } = this.props;

    return (
      <div style={styles.container}>
        <div ref={node => this.list = node} style={styles.list}>
          {transactions.map(trans => <HistoryItem key={trans.time} transaction={trans} currency={currency} />)}
        </div>
      </div>
    );
  }
};

History.propTypes = {
  currency: PropTypes.string.isRequired,
  transactions: PropTypes.instanceOf(Immutable.OrderedSet).isRequired
}

const styles = {
  container: {
    position: 'relative',
    height: '100%'
  },
  list: {
    position: 'absolute',
    bottom: 0,
    maxHeight: '100%',
    overflowY: 'auto',
    width: '100%'
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.get('currency'),
    transactions: state.get('transactions')
  }
}

export default connect(mapStateToProps)(History);

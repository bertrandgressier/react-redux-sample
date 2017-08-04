import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Loader} from 'react-loaders';

class SearchTable extends Component {

  static propTypes = {
    people: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  render() {

    let {people, isFetching} = this.props;

    if (isFetching) {
      return (
        <div style={{textAlign: 'center'}}>
          <Loader type="line-scale" active color="green"/>
        </div>);
    }

    if (people.length === 0) {
      return (
        <div style={{textAlign: 'center'}}>
          <PageHeader>No Data</PageHeader>
        </div>);
    }

    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        {people
          .map((person, i) => (<tr key={i}>
            <td>{person.index}</td>
            <td>{person.name}</td>
            <td>{person.phone}</td>
          </tr>))}
        </tbody>
      </Table>
    );
  }
}

export default connect(
  state => ({
    people: state.search.people,
    isFetching: state.search.isFetching,
  }),
)(SearchTable);
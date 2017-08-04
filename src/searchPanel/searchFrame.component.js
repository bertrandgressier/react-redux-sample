import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormControl, Panel, Well} from 'react-bootstrap';
import SearchTable from './searchTable.component';
import {fetchSearch} from './search.action';
import {connect} from 'react-redux';
import AuthRequired from '../login/authRequired.component';

export class SearchFrame extends Component {

  static propTypes = {
    searchTorrent: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.props.searchTorrent(this.state.searchInput);
  }

  render() {
    return (
      <div>
        <AuthRequired/>
        <Well>
          <Form inline>
            <FormControl name="searchInput" value={this.state.searchInput} onChange={this.handleInputChange} type="text"
                         placeholder="Search people by name"/>
            {' '}
            <Button type="submit"
                    onClick={this.handleSearchSubmit}
                    bsStyle="primary"
                    disabled={this.props.isFetching}>{this.props.isFetching ? 'Search...' : 'Search'}</Button>
          </Form>
        </Well>
        <Panel>
          <SearchTable/>
        </Panel>
      </div>
    );
  }
}

export default connect(
  state => ({
    isFetching: state.search.isFetching,
  }),
  dispatch => ({
    searchTorrent: searchText => dispatch(fetchSearch(searchText)),
  }),
)(SearchFrame);

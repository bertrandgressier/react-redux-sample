import * as React from 'react';
import { FormEvent } from 'react';
import { Button, Form, FormControl, Panel, Well } from 'react-bootstrap';
import { fetchSearch, SearchAction } from './search.action';
import { connect, Dispatch } from 'react-redux';
import { ApplicationStore } from '../../../react-redux-sample/src/root.type';
import SearchTable from './searchTable.component';

import AuthRequired from '../login/authRequired.component';

interface SearchFrameStateProps {
    isFetching: boolean;
}

interface SearchFrameDispatchProps {
    searchTorrent: Function;
}

interface SearchFrameState {
    searchInput: string;
}

class SearchFrame extends React.Component<SearchFrameStateProps & SearchFrameDispatchProps, SearchFrameState> {

    constructor(props: SearchFrameStateProps & SearchFrameDispatchProps) {
        super(props);
        this.state = {
            searchInput: '',
        };

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: FormEvent<FormControl>) {
        let target = event.target as HTMLInputElement;
        this.setState({
            ...this.state,
            [target.name]: target.value,
        });
    }

    handleSearchSubmit(event: FormEvent<FormControl>) {
        event.preventDefault();
        this.props.searchTorrent(this.state.searchInput);
    }

    render() {
        return (
            <div>
                <AuthRequired/>
                <Well>
                    <Form inline={true}>
                        <FormControl
                            name="searchInput"
                            value={this.state.searchInput}
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Search people by name"
                        />
                        {' '}
                        <Button
                            type="submit"
                            onClick={this.handleSearchSubmit}
                            bsStyle="primary"
                            disabled={this.props.isFetching}
                        >{this.props.isFetching ? 'Search...' : 'Search'}
                        </Button>
                    </Form>
                </Well>
                <Panel>
                    <SearchTable/>
                </Panel>
            </div>
        );
    }
}

export default connect<SearchFrameStateProps, SearchFrameDispatchProps, void>(
    (state: ApplicationStore): SearchFrameStateProps => ({
        isFetching: state.search.isFetching,
    }),
    (dispatch: Dispatch<SearchAction>): SearchFrameDispatchProps => ({
        searchTorrent: (search: string) => dispatch(fetchSearch(search)),
    }),
)(SearchFrame);

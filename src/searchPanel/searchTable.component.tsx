import * as React from 'react';
import { PageHeader, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ApplicationStore, Person } from '../../../react-redux-sample/src/root.type';

// import { Loader } from 'react-loaders';

interface SearchTableStateProps {
    people: Array<Person>;
    isFetching: boolean;
}

export class SearchTable extends React.Component<SearchTableStateProps> {

    render() {

        let {people, isFetching} = this.props;

        if (isFetching) {
            return (
                <div style={{textAlign: 'center'}}>
                    {/*<Loader type="line-scale" active color="green"/>*/}
                    Loading ...
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

export default connect<SearchTableStateProps, void, void>(
    (state: ApplicationStore): SearchTableStateProps => ({
        people: state.search.people,
        isFetching: state.search.isFetching,
    }),
)(SearchTable);
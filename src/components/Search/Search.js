import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const statusOptions = [
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];

function Search(props) {

    const [filters, setFilters] = useState({
        status: '',
        search: ''
    });
    const selectStatus = (value) => {
        setFilters({
            ...filters,
            status: value
        });
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search"
                />
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={filters.status}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => selectStatus(option.value)}
                            >
                                {option.label}
                            </Dropdown.Item>))
                    }

                </DropdownButton>
                <InputGroup.Append>
                    <Button variant="outline-primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}


export default connect()(Search);
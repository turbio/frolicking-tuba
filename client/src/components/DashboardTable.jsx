import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const onRowSelect = (row, isSelected) => {
  console.log(row);
  console.log(isSelected);
};

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  bgColor: 'rgb(238, 193, 213)',
  hideSelectColumn: true,
  onSelect: onRowSelect
};

const DashboardTable = ({ keys }) => (
  <BootstrapTable
    responsive
    striped
    bordered
    data={keys}
    height="270px"
    selectRow={selectRowProp}
  >
    <TableHeaderColumn dataField="name" >Name</TableHeaderColumn>
    <TableHeaderColumn dataField="key"isKey >API Key</TableHeaderColumn>
    <TableHeaderColumn dataField="endpoint" >Endpoint</TableHeaderColumn>
  </BootstrapTable>
);

DashboardTable.propTypes = {
  keys:
    PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DashboardTable;

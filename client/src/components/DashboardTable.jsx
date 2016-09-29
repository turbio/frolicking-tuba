import React, { PropTypes } from 'react';
// import { Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const DashboardTable = ({ keys }) => (
  <BootstrapTable responsive striped bordered data={keys}>
    <TableHeaderColumn dataField="name" >Name</TableHeaderColumn>
    <TableHeaderColumn dataField="apiKey"isKey >API Key</TableHeaderColumn>
    <TableHeaderColumn dataField="endpoint" >Endpoint</TableHeaderColumn>
  </BootstrapTable>
);

DashboardTable.propTypes = {
  keys:
    PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DashboardTable;

// <BootstrapTable responsive striped bordered>
//   <thead>
//     <tr>
//       <TableHeaderColumn dataField={keys.name} >Name</TableHeaderColumn>
//       <th>API Key</th>
//       <th>Endpoint</th>
//     </tr>
//   </thead>
//   <tbody>
//     {keys.map((key) =>
//       <tr>
//         <td>{key.name}</td>
//         <td>
//           &lt;script src="getmarkup.com/script.js"&gt;&lt;/script&gt;
//           {key.apiKey}
//         </td>
//         <td>{key.endpoint}</td>
//       </tr>
//     )}
//   </tbody>
// </BootstrapTable>


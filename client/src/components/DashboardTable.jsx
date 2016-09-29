import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const DashboardTable = ({ keys }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>API Key</th>
        <th>Endpoint</th>
      </tr>
    </thead>
    <tbody>
      {keys.map((key) =>
        <tr>
          <td>{key.name}</td>
          <td>
            &lt;script src="getmarkup.com/script.js"&gt;&lt;/script&gt;
            {key.apiKey}
          </td>
          <td>{key.endpoint}</td>
        </tr>
      )}
    </tbody>
  </Table>
);

DashboardTable.propTypes = {
  keys:
    PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DashboardTable;

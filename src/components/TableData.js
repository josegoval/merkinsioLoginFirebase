// React
import React from "react";
// PropTypes
import PropTypes from "prop-types";

import "../views/test.css";

function TableData({
  header,
  body,
  scrollableHead,
  scrollableBody,
  tableType,
}) {
  return (
    <table className={`table ${tableType}`}>
      <thead>
        <tr>
          {header.map((text) => (
            <th scope="col">{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((item) => (
          <tr>
            <th scope="row">{item[0]}</th>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>@{item[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableData.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  scrollableHead: PropTypes.bool.isRequired,
  scrollableBody: PropTypes.bool.isRequired,
  tableType: PropTypes.string,
};

TableData.defaultProps = {
  tableType: "table-hover",
};

export default TableData;

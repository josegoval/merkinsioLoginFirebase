// React
import React, { useState } from "react";
// PropTypes
import PropTypes from "prop-types";
// Boostrap Table
import BootstrapTable from "react-bootstrap-table-next";
// Components
import ActionFormatter from "./ActionFormatter";
// Firebase
import { deleteItem } from "../../firebase/firebaseDatabaseCRUD";

// Styles
// import "../styles/styles.css";
// import "../views/test.css";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
  },
  {
    dataField: "name",
    text: "Nombre",
    sort: true,
  },
  {
    dataField: "lastname",
    text: "Apellidos",
    sort: true,
  },
  {
    dataField: "wage",
    text: "sueldo",
    sort: true,
  },
  {
    dataField: "actions",
    text: "Actions",
    formatter: (cell, row, rowIndex) => {
      console.log(row);
      return (
        <ActionFormatter
          onDelete={() => {
            deleteItem(row.id);
          }}
          onEdit={() => {}}
        />
      );
    },
  },
];

function TableData({ header, body }) {
  const [data, setData] = useState([
    { id: 1, name: "Jose", lastname: "Gómez", wage: 2500 },
  ]);

  return <BootstrapTable keyField="id" data={data} columns={columns} />;
}

TableData.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default TableData;

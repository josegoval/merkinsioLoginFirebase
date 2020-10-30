// React
import React, { useState } from "react";
// PropTypes
import PropTypes from "prop-types";
// Boostrap Table
import BootstrapTable from "react-bootstrap-table-next";
// Icons
import { IoMdAddCircleOutline } from "react-icons/io";
// Components
import ActionFormatter from "./ActionFormatter";
import AddModalItem from "./AddModalItem";
import EditModalItem from "./EditModalItem";
import DeleteModalItem from "./DeleteModalItem";

// Styles
// import "../styles/styles.css";
// import "../views/test.css";

function TableData({ header, body }) {
  const [selectedItem, setSelectedItem] = useState({
    id: -1,
    name: "",
    lastName: "",
    wage: "",
  });
  const [data, setData] = useState([
    { id: 1, name: "Jose", lastName: "Gómez", wage: 2500 },
    { id: 2, name: "Ruso", lastName: "Gómez", wage: 30000 },
  ]);

  const changeSelectedItem = (item) => {
    setSelectedItem(item);
  };

  /**
   * Columns header style
   */
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
      dataField: "lastName",
      text: "Apellidos",
      sort: true,
    },
    {
      dataField: "wage",
      text: "Salario",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row, rowIndex) => {
        return (
          <ActionFormatter
            row={row}
            onChangeSelectedItem={changeSelectedItem}
          />
        );
      },
    },
  ];

  return (
    <>
      {/* Upper table options */}
      <div>
        <button
          type="button"
          className="btn btn-outline-primary mt-4 py-2 d-flex align-items-center justify-content-center"
          data-toggle="modal"
          data-target="#addItemModal"
        >
          <IoMdAddCircleOutline
            size={23}
            title="añadir nuevo trabajador"
            className="mr-2"
          />
          <span> Añadir Trabajador</span>
        </button>
      </div>
      {/* Table */}
      <div className="d-flex flex-column mt-4">
        <BootstrapTable keyField="id" data={data} columns={columns} />
        {/* Modals*/}
        <AddModalItem />
        <EditModalItem item={selectedItem} />
        <DeleteModalItem item={selectedItem} />
      </div>
    </>
  );
}

TableData.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default TableData;

// React
import React, { useEffect, useState } from "react";
// Boostrap Table
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// Icons
import { IoMdAddCircleOutline, IoIosCloudDownload } from "react-icons/io";
// Components
import ActionFormatter from "./ActionFormatter";
import AddModalItem from "./AddModalItem";
import AddImageModalItem from "./AddImageModalItem";
import EditModalItem from "./EditModalItem";
import DeleteModalItem from "./DeleteModalItem";
// Firebase
import {
  fetchDataFromEmployees,
  snapshotDataFromEmployees,
} from "../../firebase/firebaseDatabaseCRUD";
// Styles
import "../../styles/styles.css";

const colStyle = {
  "white-space": "normal",
  "word-wrap": "break-word",
};

function TableData() {
  const [selectedItem, setSelectedItem] = useState({
    id: -1,
    name: "",
    lastName: "",
    wage: "",
  });
  const [data, setData] = useState([]);

  /**
   * Initiatie fetchData
   */
  useEffect(() => {
    const unsuscribe = snapshotDataFromEmployees(setData);
    return () => unsuscribe();
  }, []);

  /**
   * Fetch data from firebase functionality
   */
  const fetchData = async () => {
    setData(await fetchDataFromEmployees());
  };

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
      style: colStyle,
    },
    {
      dataField: "name",
      text: "Nombre",
      sort: true,
      style: colStyle,
    },
    {
      dataField: "lastName",
      text: "Apellidos",
      sort: true,
      style: colStyle,
    },
    {
      dataField: "wage",
      text: "Salario",
      sort: true,
      style: colStyle,
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
      <div className="d-flex mt-4 py-2">
        {/* add new */}
        <button
          type="button"
          className="btn btn-outline-success d-flex align-items-center justify-content-center"
          data-toggle="modal"
          data-target="#addItemModal"
        >
          <IoMdAddCircleOutline
            size={23}
            title="añadir nuevo trabajador"
            className="mr-2"
          />
          <span>Añadir Trabajador</span>
        </button>
        {/* fetch data */}
        <button
          type="button"
          className="btn btn-outline-info ml-4 d-flex align-items-center justify-content-center"
          onClick={() => fetchData()}
        >
          <IoIosCloudDownload
            size={23}
            title="actualizar registros"
            className="m-2"
          />
          <span>Actualizar Registros</span>
        </button>
      </div>
      {/* Table */}
      <div className="d-flex flex-column mt-4">
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          pagination={paginationFactory()}
        />
        {/* Modals*/}
        <AddModalItem />
        <AddImageModalItem item={selectedItem} />
        <EditModalItem item={selectedItem} />
        <DeleteModalItem item={selectedItem} />
      </div>
    </>
  );
}

export default TableData;

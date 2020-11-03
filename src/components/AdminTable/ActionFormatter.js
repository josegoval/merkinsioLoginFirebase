// React
import React from "react";
// Icons
import { BiImageAdd, BiEdit, BiTrash } from "react-icons/bi";

export default function ActionFormatter({ row, onChangeSelectedItem }) {
  return (
    <>
      {/* // Modal Buttons */}
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2 mb-xs-2 mb-sm-2 mb-md-0 mb-lg-0"
          data-toggle="modal"
          data-target="#addImageModal"
          onClick={() => onChangeSelectedItem(row)}
        >
          <BiImageAdd size={23} title="Añadir Imagen" />
        </button>
        <button
          type="button"
          className="btn btn-warning mr-2 mb-xs-2 mb-sm-2 mb-md-0 mb-lg-0"
          data-toggle="modal"
          data-target="#editItemModal"
          onClick={() => onChangeSelectedItem(row)}
        >
          <BiEdit size={23} title="Editar Registro" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#deleteItemModal"
          onClick={() => onChangeSelectedItem(row)}
        >
          <BiTrash size={23} title="Eliminar Registro" />
        </button>
      </div>
    </>
  );
}

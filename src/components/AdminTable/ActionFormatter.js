// React
import React from "react";
// Icons
import { BiEdit, BiTrash } from "react-icons/bi";
// Firebase
// import { deleteItem } from "../../firebase/firebaseDatabaseCRUD";

export default function ActionFormatter({ row, onChangeSelectedItem }) {
  return (
    <>
      {/* // Modal Buttons */}
      <div>
        <button
          type="button"
          className="btn btn-warning mr-2"
          data-toggle="modal"
          data-target="#editItemModal"
          onClick={() => onChangeSelectedItem(row)}
        >
          <BiEdit size={23} />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#deleteItemModal"
          onClick={() => onChangeSelectedItem(row)}
        >
          <BiTrash size={23} />
        </button>
      </div>
    </>
  );
}

// React
import React from "react";
// Icons
import { BiEdit, BiTrash } from "react-icons/bi";

export default function ActionFormatter({ onEdit, onDelete }) {
  return (
    <div>
      <button type="button" className="btn btn-warning mr-2">
        <BiEdit onClick={() => onEdit()} size={23} />
      </button>
      <button type="button" className="btn btn-danger">
        <BiTrash onClick={() => onDelete()} size={23} />
      </button>
    </div>
  );
}

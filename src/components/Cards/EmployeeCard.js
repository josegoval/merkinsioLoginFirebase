// React
import React from "react";
// Icons
import { FaMoneyCheckAlt } from "react-icons/fa";
// Styles
import "../../styles/styles.css";

function EmployeeCard({ name, lastName, wage, image }) {
  return (
    <div className="card bg-light text-center cards-EmployeeCard">
      {/* Image size: 110x125  */}
      <div className="px-3 pt-2">
        {image instanceof Blob ? (
          <img
            // Current Preview
            className="card-img-top cards-EmployeeCard-image"
            src={URL.createObjectURL(image)}
            alt="Vista Previa de la Imagen"
          />
        ) : (
          <img
            //  Empty or url image
            className="card-img-top cards-EmployeeCard-image"
            src={
              typeof image === "string"
                ? image
                : "./images/employee_preview.png"
            }
            alt="Vista Previa de la Imagen"
          />
        )}
      </div>
      <div className="card-body d-flex flex-column justify-content-end align-items-center pt-2 pb-2">
        <span className="card-text">{name}</span>
        <h4 className="card-title mb-1">{lastName}</h4>
        <span className="card-text d-flex justify-content-center align-items-center">
          <FaMoneyCheckAlt title="salario" size={30} className="pt-1" />
          <span className="pl-3 cards-EmployeeCard-salary">{`${wage} €`}</span>
        </span>
      </div>
    </div>
  );
}

export default EmployeeCard;

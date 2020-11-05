// React
import React, { useEffect, useState } from "react";
// Router
import { useHistory } from "react-router-dom";
// Firebase
import { snapshotDataFromEmployees } from "../firebase/firebaseDatabaseCRUD";
// Components
import EmployeeCard from "../components/Cards/EmployeeCard";
// Utilities
import { isNullOrEmpty, stringIncludesText } from "../utils/inputUtilities";
// Styles
import "../styles/styles.css";

export default function Cards({ loggedIn }) {
  let history = useHistory();
  const [data, setData] = useState(null);
  // Inputs
  const [filterNameInput, setFilterNameInput] = useState("");
  const [filterLastNameInput, setFilterLastNameInput] = useState("");
  const [filterSelectedWageInput, setFilterSelectedWageInput] = useState("1");
  const [filterWageInput, setFilterWageInput] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    const unsuscribe = snapshotDataFromEmployees(updateData);
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    data && filterResults();
  }, [
    filterLastNameInput,
    filterNameInput,
    filterSelectedWageInput,
    filterWageInput,
  ]);

  const updateData = (newData) => {
    setData(
      newData.map((data) => {
        return { ...data, display: true };
      })
    );
  };

  const handleFilterNameInput = (e) => {
    setFilterNameInput(e.target.value);
  };

  const handleFilterLastNameInput = (e) => {
    setFilterLastNameInput(e.target.value);
  };

  const handleFilterWageInput = (e) => {
    setFilterWageInput(e.target.value);
  };

  const handleFilterSelectedWageInput = (e) => {
    setFilterSelectedWageInput(e.target.value);
  };

  const filterResults = () => {
    setData((prevData) =>
      prevData.map((employee) => {
        let result = true;

        if (!isNullOrEmpty(filterNameInput)) {
          result = stringIncludesText(employee.name, filterNameInput);
        }
        if (!isNullOrEmpty(filterLastNameInput) && result) {
          console.log(filterLastNameInput);
          result = stringIncludesText(employee.lastName, filterLastNameInput);
        }
        if (!isNullOrEmpty(filterWageInput) && result) {
          console.log(filterSelectedWageInput);
          result =
            filterSelectedWageInput === "1"
              ? Number(employee.wage) > Number(filterWageInput)
              : Number(employee.wage) < Number(filterWageInput);
        }

        return { ...employee, display: result };
      })
    );
  };

  return (
    <div className="container-fluid">
      {/* Filtros */}
      <form className="card">
        <div className="card-body row">
          <div className="form-group col-lg-4 col-xs-12">
            <label for="filterNameInput">Filtro de nombres</label>
            <input
              type="text"
              className="form-control"
              id="filterNameInput"
              placeholder="Filtrar por nombre..."
              value={filterNameInput}
              onChange={handleFilterNameInput}
            />
          </div>
          <div className="form-group col-lg-4 col-xs-12">
            <label for="filterLastNameInpuy">Filtro de apellidos</label>
            <input
              type="text"
              className="form-control"
              id="filterLastNameInpuy"
              placeholder="Filtrar por apellido..."
              value={filterLastNameInput}
              onChange={handleFilterLastNameInput}
            />
          </div>
          <div className="form-group col-lg-4 col-xs-12">
            <label for="filterWageInput">Filtro de sueldos</label>
            <div className="d-flex flex-columns">
              <select
                className="custom-select mr-1"
                onChange={handleFilterSelectedWageInput}
                value={filterSelectedWageInput}
              >
                <option selected value="1">
                  Mayores de
                </option>
                <option value="2">Menores de</option>
              </select>
              <input
                type="number"
                className="form-control"
                step="0.01"
                id="filterWageInput"
                placeholder="0.00"
                value={filterWageInput}
                onChange={handleFilterWageInput}
              />
            </div>
          </div>
        </div>
      </form>
      {/* Cards */}
      <div className="d-flex flex-wrap justify-content-around red">
        {data &&
          data.map((employee) => {
            if (employee.display) {
              return (
                <div className="py-3 px-2" key={employee.id}>
                  <EmployeeCard
                    name={employee.name}
                    lastName={employee.lastName}
                    wage={employee.wage}
                    image={employee.img}
                  />
                </div>
              );
            }
            return <></>;
          })}
      </div>
      <div className="row justify-content-around blue">
        {data &&
          data.map((employee) => {
            if (employee.display) {
              return (
                <div className="col-auto py-2" key={employee.id}>
                  <EmployeeCard
                    name={employee.name}
                    lastName={employee.lastName}
                    wage={employee.wage}
                    image={employee.img}
                  />
                </div>
              );
            }
            return <></>;
          })}
      </div>
    </div>
  );
  // comprobar si esta logeado - admin sino login
  // https://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
  // https://codepen.io/devstreak/pen/dMYgeO
}

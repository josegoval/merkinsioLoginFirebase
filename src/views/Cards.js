// React
import React, { useEffect, useState } from "react";
// Router
import { useHistory } from "react-router-dom";
// Firebase
import { snapshotDataFromEmployees } from "../firebase/firebaseDatabaseCRUD";
// Components
import EmployeeCard from "../components/Cards/EmployeeCard";
// Styles
import "../styles/styles.css";

export default function Cards({ loggedIn }) {
  let history = useHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    const unsuscribe = snapshotDataFromEmployees(setData);
    return () => unsuscribe();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-around red">
        {data &&
          data.map((employee) => {
            console.log(employee.img);
            console.log(typeof employee.img === "string");
            return (
              <div className="py-3 px-2">
                <EmployeeCard
                  key={employee.id}
                  name={employee.name}
                  lastName={employee.lastName}
                  wage={employee.wage}
                  image={employee.img}
                />
              </div>
            );
          })}
      </div>
      <div className="row justify-content-around blue">
        {data &&
          data.map((employee, index) => (
            <div className="col-auto py-2">
              <EmployeeCard
                key={employee.id}
                name={employee.name}
                lastName={employee.lastName}
                wage={employee.wage}
                image={employee.img}
              />
            </div>
          ))}
      </div>
    </div>
  );
  // comprobar si esta logeado - admin sino login
  // https://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
  // https://codepen.io/devstreak/pen/dMYgeO
}

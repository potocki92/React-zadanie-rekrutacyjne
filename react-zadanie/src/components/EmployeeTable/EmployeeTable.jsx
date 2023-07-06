import React from "react";

const EmployeeTable = ({ employess }) => {
  console.log(employess.map((employe) => {
    console.log(employe);
  }));
  return <div>
    {employess.map((employee) => (
        <div key={employee.id}>{employee.id}</div>
      ))}
  </div>;
};

export default EmployeeTable;

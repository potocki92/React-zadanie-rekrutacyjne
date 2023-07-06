import "./App.css";
import employeesData from "./date/sluzba.json";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";

function App() {
  return (
    <>
      <EmployeeTable employees={employeesData} />
    </>
  );
}

export default App;

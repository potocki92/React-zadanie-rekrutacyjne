import React, { useState } from "react";

/**
 * Komponent reprezentujący tabelę pracowników.
 * @param {Object[]} employees - Tablica obiektów reprezentujących dane pracowników.
 * @returns {JSX.Element} Składnik React wyświetlający tabelę pracowników.
 */
const EmployeeTable = ({ employees }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  /**
   * Obsługuje filtrowanie danych pracowników.
   * @param {Object} e - Obiekt zdarzenia zmiany wartości pola tekstowego.
   */
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.dateOfBirth.toLowerCase().includes(searchTerm) ||
        employee.function.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filteredData);
    setCurrentPage(1); // Resetuj bieżącą stronę po filtrowaniu
  };

  /**
   * Obsługuje sortowanie danych pracowników.
   * @param {string} column - Nazwa kolumny do sortowania.
   */
  const handleSort = (column) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.column === column &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sortedData = [...filteredEmployees].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : 1;
    });
    setFilteredEmployees(sortedData);
    setSortConfig({ column, direction });
  };

  /**
   * Obsługuje zmianę bieżącej strony paginacji.
   * @param {number} page - Numer wybranej strony.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredEmployees.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(filteredEmployees.length / resultsPerPage);
  return (
    <div>
      <input type="text" placeholder="Filtruj" onChange={handleFilter} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("firstName")}>Imię</th>
            <th onClick={() => handleSort("lastName")}>Nazwisko</th>
            <th onClick={() => handleSort("dateOfBirth")}>Data urodzenia</th>
            <th onClick={() => handleSort("function")}>Stanowisko</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.function}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button key={page} onClick={() => handlePageChange(page)}>
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;

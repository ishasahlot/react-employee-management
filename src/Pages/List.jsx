import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "test",
        password: "123456",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.TABLE_DATA.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortOrder]);
  const processedData = data.map(item => ({
    raw: item,
    salary: parseInt(item[5].replace(/[^0-9]/g, ""))
    }));
    const filteredSortedData = processedData
  .filter((item) =>
    item.raw[0].toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (!sortOrder) return 0;
    if (sortOrder === "asc") return a.salary - b.salary;
    if (sortOrder === "desc") return b.salary - a.salary;
    return 0;
  });
const totalPages = Math.ceil(filteredSortedData.length / rowsPerPage);
const paginatedData = filteredSortedData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
const startIndex = (currentPage - 1) * rowsPerPage + 1;
const endIndex = Math.min(currentPage * rowsPerPage, filteredSortedData.length);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="list-container">
<div className="list-header">
        <h1>Employee List</h1>
  
        <button className="logout-btn"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
          }}
          style={{
            padding: "8px 14px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

<input className="search-input"
  type="text"
  placeholder="Search by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "8px",
    marginBottom: "20px",
    width: "300px"
  }}
/>
<select className="sort-select"
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  style={{ marginLeft: "10px", padding: "8px" }}
>
  <option value="">Sort by Salary</option>
  <option value="asc">Low to High</option>
  <option value="desc">High to Low</option>
</select>

<table className="employee-table"
  style={{
    marginTop: "20px",
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }}
>
<thead>
  <tr>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Name</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Position</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Office</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Extension</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Start Date</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Salary</th>
    <th style={{ background: "#1e293b", color: "white", padding: "12px", textAlign: "left" }}>Action</th>
  </tr>
</thead>
<tbody>
{paginatedData.map((item, index) => (
    <tr
    key={item.raw[3]}   
>
    {item.raw.map((value, i) => (
  <td
    key={i}
    style={{
      padding: "12px",
      borderBottom: "1px solid #e5e7eb"
    }}
  >
    {value}
  </td>
))}
      <td
  style={{
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
  }}
>
<button className="view-btn"
  style={{
    padding: "6px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  }}
  onClick={() =>
    navigate("/details", { state: { employee: item.raw } })
  }
>
  View
</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
<div style={{ marginTop: "15px", fontSize: "14px", color: "#475569" }}>
  Showing {filteredSortedData.length === 0 ? 0 : startIndex}–
  {endIndex} of {filteredSortedData.length} results
</div>
<div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => prev - 1)}
    style={{ marginRight: "10px", padding: "6px 12px" }}
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
 <button
 key={i}
 onClick={() => setCurrentPage(i + 1)}
 className={currentPage === i + 1 ? "active" : ""}
>
 {i + 1}
</button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => prev + 1)}
    style={{ marginLeft: "10px", padding: "6px 12px" }}
  >
    Next
  </button>

</div>

</div>
  );
}

export default List;
import { useState, useMemo } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const initialData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  { id: 7, name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'Inactive' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'Manager', status: 'Active' },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'Active' },
  { id: 10, name: 'Henry Wilson', email: 'henry@example.com', role: 'User', status: 'Inactive' },
]

function Tables() {
  const [data, setData] = useState<User[]>(initialData)
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const itemsPerPage = 5

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [data, sortColumn, sortDirection])

  const filteredData = useMemo(() => {
    if (!filter) return sortedData
    
    return sortedData.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase()) ||
      user.status.toLowerCase().includes(filter.toLowerCase())
    )
  }, [sortedData, filter])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map(user => user.id))
    }
  }

  const deleteSelectedRows = () => {
    setData(data.filter(user => !selectedRows.includes(user.id)))
    setSelectedRows([])
  }

  return (
    <div className="page">
      <h1>Tables</h1>
      <p>Practice automating table interactions: sorting, filtering, and pagination</p>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          id="table-filter"
          data-testid="table-filter"
          placeholder="Filter by name, email, role, or status..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setCurrentPage(1)
          }}
          style={{ flex: 1, minWidth: '250px', padding: '0.75rem' }}
        />
        {selectedRows.length > 0 && (
          <button
            id="delete-selected"
            data-testid="delete-selected"
            className="danger"
            onClick={deleteSelectedRows}
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table id="user-table" data-testid="user-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="select-all"
                  data-testid="select-all"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th
                onClick={() => handleSort('id')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                data-testid="sort-id"
              >
                ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                data-testid="sort-name"
              >
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('email')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                data-testid="sort-email"
              >
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('role')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                data-testid="sort-role"
              >
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('status')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                data-testid="sort-status"
              >
                Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((user) => (
                <tr
                  key={user.id}
                  data-testid={`row-${user.id}`}
                  style={{
                    backgroundColor: selectedRows.includes(user.id) ? '#d4edda' : undefined
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      data-testid={`checkbox-${user.id}`}
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleRowSelect(user.id)}
                    />
                  </td>
                  <td data-testid={`id-${user.id}`}>{user.id}</td>
                  <td data-testid={`name-${user.id}`}>{user.name}</td>
                  <td data-testid={`email-${user.id}`}>{user.email}</td>
                  <td data-testid={`role-${user.id}`}>{user.role}</td>
                  <td data-testid={`status-${user.id}`}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        backgroundColor: user.status === 'Active' ? '#27ae60' : '#95a5a6',
                        color: 'white',
                        fontSize: '0.875rem'
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div id="pagination-info" data-testid="pagination-info">
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            id="prev-page"
            data-testid="prev-page"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="secondary"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              id={`page-${page}`}
              data-testid={`page-${page}`}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? '' : 'secondary'}
              style={{ minWidth: '40px' }}
            >
              {page}
            </button>
          ))}
          <button
            id="next-page"
            data-testid="next-page"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="secondary"
          >
            Next
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Automation Practice Tips:</h3>
        <ul>
          <li>Click column headers to sort</li>
          <li>Use the filter box to search across all fields</li>
          <li>Select individual rows or use "Select All"</li>
          <li>Navigate through pages using pagination buttons</li>
          <li>Each cell has a unique data-testid for easy automation</li>
        </ul>
      </div>
    </div>
  )
}

export default Tables

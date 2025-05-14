export default function Table  ({ title, columns, data, containerClassName }) {
  return (
    <div className={`rounded-lg surface shadow p-6 shadow-md border border-gray-300 ${containerClassName || ''}`}>
      {/* Title stays fixed */}
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      
      {/* Scrollable container for table content */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          {/* Header */}
          <thead>
            <tr className="border-b-2 border-gray-300">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={`py-3 px-4 font-semibold text-left ${column.className || ''}`}
                  style={{width: column.widthPercent || 'auto'}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Rows */}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`py-3 px-4 ${column.className || ''}`}
                  >
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
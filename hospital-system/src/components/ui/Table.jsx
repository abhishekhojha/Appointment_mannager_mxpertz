import React from "react";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white hover:bg-gray-50">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

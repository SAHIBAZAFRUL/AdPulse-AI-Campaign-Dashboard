function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-800">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th>Email</th>

            <th>Company</th>

            <th>Industry</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer._id}
              className="border-b border-slate-800 hover:bg-slate-800 transition"
            >

              <td className="p-4">
                {customer.name}
              </td>

              <td>{customer.email}</td>

              <td>{customer.company}</td>

              <td>{customer.industry}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    customer.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {customer.status}
                </span>

              </td>

              <td>

                <button
                  onClick={() =>
                    onEdit(customer)
                  }
                  className="bg-yellow-500 px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(customer._id)
                  }
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CustomerTable;
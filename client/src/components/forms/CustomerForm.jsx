import { useEffect, useState } from "react";
import API from "../../services/api";

function CustomerForm({ selectedCustomer, refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    status: "Active",
  });

  useEffect(() => {
    if (selectedCustomer) {
      setForm(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      status: "Active",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCustomer) {
        await API.put(
          `/customers/${selectedCustomer._id}`,
          form
        );
      } else {
        await API.post("/customers", form);
      }

      clearForm();
      refresh();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl mb-8">

      <h2 className="text-2xl font-bold mb-6">
        {selectedCustomer
          ? "Edit Customer"
          : "Add Customer"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >

        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          className="col-span-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl py-3 font-bold"
        >
          {selectedCustomer
            ? "Update Customer"
            : "Add Customer"}
        </button>

      </form>

    </div>
  );
}

export default CustomerForm;
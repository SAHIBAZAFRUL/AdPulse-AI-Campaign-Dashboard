import { useEffect, useState } from "react";
import API from "../services/api";

import CustomerStats from "../components/CustomerStats";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/forms/CustomerForm";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* No page heading here — Navbar already shows "Customers"
          and its subtitle for this route. */}

      <CustomerStats customers={customers} />

      <CustomerForm
        selectedCustomer={selectedCustomer}
        refresh={fetchCustomers}
      />

      <CustomerTable
        customers={customers}
        refresh={fetchCustomers}
        onEdit={setSelectedCustomer}
      />
    </>
  );
}

export default Customers;
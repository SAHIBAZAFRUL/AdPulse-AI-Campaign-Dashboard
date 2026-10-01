function CustomerStats({ customers }) {
  const total = customers.length;

  const active = customers.filter(
    (c) => c.status === "Active"
  ).length;

  const inactive = customers.filter(
    (c) => c.status === "Inactive"
  ).length;

  const industries = new Set(
    customers.map((c) => c.industry)
  ).size;

  const cards = [
    {
      title: "Total Customers",
      value: total,
      color: "cyan",
    },
    {
      title: "Active",
      value: active,
      color: "green",
    },
    {
      title: "Inactive",
      value: inactive,
      color: "red",
    },
    {
      title: "Industries",
      value: industries,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 hover:border-${card.color}-500 transition`}
        >
          <p className="text-slate-400">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CustomerStats;
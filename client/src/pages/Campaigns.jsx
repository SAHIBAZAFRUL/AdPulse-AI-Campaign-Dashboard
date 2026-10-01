import { useState } from "react";
import CampaignTable from "../components/CampaignTable";
import CampaignForm from "../components/forms/CampaignForm";
import ExportButton from "../components/ExportButton";
import { FiPlus, FiCalendar } from "react-icons/fi";

function Campaigns() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const refreshTable = () => {
    setRefresh(!refresh);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedCampaign(null);
    setShowForm(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Campaigns</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Manage your advertising campaigns
          </p>
        </div>

        <div className="flex gap-3">
          <ExportButton />

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition px-5 py-3 rounded-xl font-semibold text-sm"
          >
            <FiPlus size={16} />
            Add Campaign
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-3 bg-[#17223B] border border-[#2A3B57] rounded-xl px-4 py-3">
          <FiCalendar className="text-slate-400 shrink-0" size={16} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            // color-scheme: dark makes the browser's native date-
            // picker icon and popup render in a dark palette instead
            // of the default white square that clashed with the theme.
            style={{ colorScheme: "dark" }}
            className="bg-transparent outline-none text-sm text-white"
          />
        </div>

        <div className="flex items-center gap-3 bg-[#17223B] border border-[#2A3B57] rounded-xl px-4 py-3">
          <FiCalendar className="text-slate-400 shrink-0" size={16} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ colorScheme: "dark" }}
            className="bg-transparent outline-none text-sm text-white"
          />
        </div>
      </div>

      <CampaignTable
        refresh={refresh}
        onEdit={handleEdit}
        startDate={startDate}
        endDate={endDate}
      />

      {showForm && (
        <CampaignForm
          onClose={() => setShowForm(false)}
          refresh={refreshTable}
          selectedCampaign={selectedCampaign}
        />
      )}
    </>
  );
}

export default Campaigns;
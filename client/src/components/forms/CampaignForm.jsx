import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

function CampaignForm({ onClose, refresh, selectedCampaign }) {
  const [formData, setFormData] = useState({
    campaignName: "",
    platform: "Google Ads",
    budget: "",
    impressions: "",
    clicks: "",
    conversions: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (selectedCampaign) {
      setFormData({
        campaignName: selectedCampaign.campaignName,
        platform: selectedCampaign.platform,
        budget: selectedCampaign.budget,
        impressions: selectedCampaign.impressions,
        clicks: selectedCampaign.clicks,
        conversions: selectedCampaign.conversions,
        startDate: selectedCampaign.startDate.slice(0, 10),
        endDate: selectedCampaign.endDate.slice(0, 10),
      });
    }
  }, [selectedCampaign]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCampaign) {
        await API.put(
          `/campaigns/${selectedCampaign._id}`,
          formData
        );

        toast.success("Campaign Updated Successfully");
      } else {
        await API.post("/campaigns", formData);

        toast.success("Campaign Added Successfully");
      }

      refresh();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-[550px] space-y-4"
      >

        <h2 className="text-2xl font-bold mb-4">

          {selectedCampaign ? "Edit Campaign" : "Add Campaign"}

        </h2>

        <input
          type="text"
          name="campaignName"
          placeholder="Campaign Name"
          value={formData.campaignName}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
        >
          <option>Google Ads</option>
          <option>Facebook Ads</option>
          <option>Instagram Ads</option>
          <option>LinkedIn Ads</option>
        </select>

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          type="number"
          name="impressions"
          placeholder="Impressions"
          value={formData.impressions}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          type="number"
          name="clicks"
          placeholder="Clicks"
          value={formData.clicks}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          type="number"
          name="conversions"
          placeholder="Conversions"
          value={formData.conversions}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800"
          required
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
          >
            {selectedCampaign ? "Update Campaign" : "Add Campaign"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default CampaignForm;
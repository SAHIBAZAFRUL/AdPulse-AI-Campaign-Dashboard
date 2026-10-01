import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import API from "../services/api";

const ExportButton = () => {
  const exportExcel = async () => {
    try {
      const res = await API.get("/campaigns");

      const data = res.data.map((campaign) => ({
        Campaign: campaign.campaignName,
        Platform: campaign.platform,
        Budget: campaign.budget,
        Impressions: campaign.impressions,
        Clicks: campaign.clicks,
        Conversions: campaign.conversions,
        "Start Date": new Date(
          campaign.startDate
        ).toLocaleDateString(),
        "End Date": new Date(
          campaign.endDate
        ).toLocaleDateString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Campaigns"
      );

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const fileData = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(fileData, "Campaign_Report.xlsx");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={exportExcel}
      className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
    >
      📊 Export Excel
    </button>
  );
};

export default ExportButton;
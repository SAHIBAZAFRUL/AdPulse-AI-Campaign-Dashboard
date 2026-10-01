import DashboardStats from "../components/DashboardStats";
import PerformanceChart from "../components/PerformanceChart";
import PlatformPieChart from "../components/PlatformPieChart";
import AIInsights from "../components/AIInsights";
import RecentActivity from "../components/RecentActivity";
import TopCampaign from "../components/TopCampaign";

export default function Dashboard() {
  return (
    <div
      className="
      flex
      flex-col
      gap-12
      pb-8
      "
    >
      {/* Statistics */}
      <DashboardStats />

      {/* Charts */}
      <section
        className="
        grid
        grid-cols-1
        xl:grid-cols-12
        gap-10
        "
      >
        <div className="xl:col-span-8">
          <PerformanceChart />
        </div>

        <div className="xl:col-span-4">
          <PlatformPieChart />
        </div>
      </section>

      {/* AI Insights */}
      <section className="pt-2">
        <AIInsights />
      </section>

      {/* Bottom */}
      <section
        className="
        grid
        grid-cols-1
        xl:grid-cols-12
        gap-10
        pt-2
        "
      >
        <div className="xl:col-span-7">
          <RecentActivity />
        </div>

        <div className="xl:col-span-5">
          <TopCampaign />
        </div>
      </section>
    </div>
  );
}
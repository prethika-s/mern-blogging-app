import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

import {
  LuChartLine,
  LuCheckCheck,
  LuGalleryVerticalEnd,
  LuHeart,
} from "react-icons/lu";
import DashboardSummaryCard from "../../components/Cards/DashboardSummaryCard";
import TagInsights from "../../components/Cards/TagInsights";
import TopPostCard from "../../components/Cards/TopPostCard";
import RecentCommentList from "../../components/Cards/RecentCommentList";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [maxViews, setMaxViews] = useState(0);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        const topPosts = response.data?.topPosts || [];
        const totalViews = Math.max(...topPosts.map((p) => p.views), 1);
        setMaxViews(totalViews);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {dashboardData && (
        <>
          {/* Greeting & Summary Cards */}
          <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-5">
            <div className="col-span-3">
              <h2 className="text-xl md:text-2xl font-medium">
                Good Morning! {user.name}
              </h2>
              <p className="text-xs md:text-[13px] font-medium text-gray-400 mt-1.5">
                {moment().format("dddd MMM YYYY")}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
              <DashboardSummaryCard
                icon={<LuGalleryVerticalEnd />}
                label="Total Posts"
                value={dashboardData?.stats?.totalPosts || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard
                icon={<LuCheckCheck />}
                label="Published"
                value={dashboardData?.stats?.published || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard
                icon={<LuChartLine />}
                label="Total Views"
                value={dashboardData?.stats?.totalViews || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard
                icon={<LuHeart />}
                label="Total Likes"
                value={dashboardData?.stats?.totalLikes || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
              />
            </div>
          </div>

          {/* Tag Insights & Top Posts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 md:my-6">
            {/* Tag Insights */}
            <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium">Tag Insights</h5>
              </div>
              <TagInsights tagUsage={dashboardData?.tagUsage || []} />
            </div>

            {/* Top Posts */}
            <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium">Top Posts</h5>
              </div>
              {dashboardData?.topPosts?.slice(0, 3).map((post) => (
                <TopPostCard
                  key={post._id}
                  title={post.title}
                  coverImageUrl={post.coverImageUrl}
                  views={post.views}
                  likes={post.likes}
                  maxViews={maxViews}
                />
              ))}
            </div>

            {/* Recent Comments - now full width */}
            <div className="col-span-12 bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-base md:text-lg font-medium">Recent Comments</h5>
              </div>
              <RecentCommentList comments={dashboardData.recentComments || []} />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { KeyRoundIcon, UsersIcon, UserCog2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import GrievancesTable from "../components/GrievanceTable";
import { ensureAuthenticated } from "../store/auth.store";
import { useNavigate } from "react-router";

const userStats = {
  totalGrievances: 145,
  Resolved: 45,
  pending: 100,
};



function Public() {

  const {isAuthenticated} = ensureAuthenticated();

  return (
    <>
    <div className="flex-1 overflow-auto relative z-10 dark:bg-[#121826] dark:text-gray-200 text-gray-900">
      <Header title="Public Grievances" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Grievances"
            icon={UsersIcon}
            value={userStats.totalGrievances.toLocaleString()}
            color="dark:bg-[#4F46E5] bg-[#E0E7FF] dark:text-white text-gray-900"
          />
          <StatCard
            name="Resolved"
            icon={KeyRoundIcon}
            value={userStats.Resolved}
            color="dark:bg-[#10B981] bg-[#D1FAE5] dark:text-white text-gray-900"
          />
          <StatCard
            name="Pending"
            icon={UserCog2}
            value={userStats.pending.toLocaleString()}
            color="dark:bg-[#FACC15] bg-[#FEF9C3] dark:text-gray-900 text-gray-900"
          />
        </motion.div>

        <GrievancesTable privatepage={false} />
      </main>
    </div>
    </>
  );
}


export default Public;

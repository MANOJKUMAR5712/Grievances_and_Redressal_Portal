import React from 'react'
import { motion } from "framer-motion";
import { KeyRoundIcon, UserCheck, UserCog2, UserPlus, UsersIcon, UserX } from "lucide-react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import GrievancesTable from "../components/GrievanceTable";

const userStats = {
  totalGrievances: 10,
  Resolved: 6,
  pending: 4,
};

function Private() {

    return(
        <div className='flex-1 overflow-auto relative z-10 dark:bg-gray-900 dark:text-gray-100'>
        <Header title='Private Grievances' />
  
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          {/* STATS */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name='Total grievances'
              icon={UsersIcon}
              value={userStats.totalGrievances.toLocaleString()}
              color='#6366F1'
            />
            <StatCard
              name='Resolved'
              icon={KeyRoundIcon}
              value={userStats.Resolved}
              color='#10B981'
            />
            <StatCard
              name='Pending'
              icon={UserCog2}
              value={userStats.pending.toLocaleString()}
              color='#F59E0B'
            />
          </motion.div>
  
          <GrievancesTable privatepage = {true}/>
          
        </main>
      </div>
    );
  }


export default Private
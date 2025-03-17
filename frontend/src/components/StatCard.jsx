import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-sky-100 dark:bg-[#121826] bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 dark:border-gray-700 transition-all duration-300"
      whileHover={{
        y: -5,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium dark:text-white text-gray-900">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold dark:text-white text-gray-900">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;

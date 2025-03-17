import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGrievance } from "../store/manage-grievances";

function GrievanceTable({ privatepage }) {
  const { fetchGrievances, grievances } = useGrievance();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGrievances, setFilteredGrievances] = useState([]);

  useEffect(() => {
    const getGrievances = async () => {
      const { success, message } = await fetchGrievances();
      console.log("Fetch Success:", success);
      console.log("Message:", message);
    };
    getGrievances();
  }, [fetchGrievances]);

  useEffect(() => {
    if (grievances.length > 0) {
      const filtered = grievances.filter((grievance) => {
        const matchesType = grievance.grievanceType === (privatepage ? "private" : "public");
        const matchesSearch =
          grievance.id.toLowerCase().includes(searchTerm) ||
          grievance.from.toLowerCase().includes(searchTerm) ||
          grievance.to.toLowerCase().includes(searchTerm) ||
          grievance.subject.toLowerCase().includes(searchTerm);
        return matchesType && matchesSearch;
      });
      setFilteredGrievances(filtered);
    }
  }, [grievances, searchTerm, privatepage]);

  return (
    <motion.div
      className="dark:bg-gray-900 bg-sky-100 backdrop-blur-md shadow-lg rounded-xl p-6 border dark:border-[#282640] border-[#D6CFFC]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* HEADER + SEARCH BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white text-gray-900">
          {privatepage ? "Private" : "Public"} Grievances
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search grievances..."
            className="dark:bg-[#282640] bg-white dark:text-gray-200 text-gray-900 
                     dark:placeholder-gray-400 placeholder-gray-600 rounded-lg pl-10 pr-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Search className="absolute left-3 top-2.5 dark:text-gray-400 text-gray-600" size={18} />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y dark:divide-[#2F2D41] divide-gray-300">
          <thead>
            <tr>
              {["Id", "From", "Subject", "Description", "To", "Date", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-[#2F2D41] divide-gray-300">
            {filteredGrievances.map((grievance) => (
              <motion.tr
                key={grievance.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="dark:hover:bg-[#2F2D41] hover:bg-gray-100 dark:odd:bg-[#282640] odd:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-900">
                  {grievance.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-900">
                  {grievance.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-900">
                  {grievance.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  dark:bg-gray-700 bg-gray-200 dark:text-gray-300 text-gray-900">
                    {grievance.description}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-900">
                  {grievance.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-900">
                  {grievance.date}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        grievance.status === "resolved"
                          ? "dark:bg-green-600/40 bg-green-200 dark:text-green-200 text-green-900"
                          : "dark:bg-red-600/40 bg-red-200 dark:text-red-200 text-red-900"
                      }`}
                  >
                    {grievance.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default GrievanceTable;

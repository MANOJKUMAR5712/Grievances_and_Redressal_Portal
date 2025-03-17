import React, { useState } from 'react';
import { useGrievance } from '../store/manage-grievances';

function Createpage() {
  const [grievance, setGrievance] = useState({
    id: "",
    subject: "",
    description: "",
    from: "",
    to: "",
    date: "",
    grievanceType: "",
  });

  const { createGrievance } = useGrievance();

  async function handleSubmit(event) {
    event.preventDefault();
    const { success, message } = await createGrievance(grievance);
    console.log("success :", success);
    console.log("message :", message);
    setGrievance({
      id: "",
      subject: "",
      description: "",
      from: "",
      to: "",
      date: "",
      grievanceType: "",
    });
  }

  return (
    <div className="mt-9 max-w-[600px] mx-auto p-6 bg-sky-100 dark:bg-[#1a1128] rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Grievance
      </h1>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Grievance id"
            value={grievance.id}
            id="id"
            onChange={(event) => setGrievance({ ...grievance, id: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={grievance.subject}
            id="subject"
            onChange={(event) => setGrievance({ ...grievance, subject: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="text-box"
            placeholder="Description"
            value={grievance.description}
            id="description"
            onChange={(event) => setGrievance({ ...grievance, description: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Date"
            value={grievance.date}
            id="date"
            onChange={(event) => setGrievance({ ...grievance, date: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="To"
            value={grievance.to}
            id="to"
            onChange={(event) => setGrievance({ ...grievance, to: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="From"
            value={grievance.from}
            id="from"
            onChange={(event) => setGrievance({ ...grievance, from: event.target.value })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Grievance Type"
            value={grievance.grievanceType}
            id="grievanceType"
            onChange={(event) => setGrievance({ ...grievance, grievanceType: event.target.value.toLowerCase() })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-500 dark:text-gray-50"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:ring-4 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Createpage;

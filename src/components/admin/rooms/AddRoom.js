import React from 'react'
import { useState } from 'react';
import AddForm from './AddForm';

const AddRoom = () => {
  const [activeTab, setActiveTab] = useState("room");
  

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" role="tablist">
        <li className="me-2">
          <button
            onClick={() => setActiveTab("room")}
            type="button"
            role="tab"
            aria-controls="room"
            aria-selected={activeTab === "room"}
            className={`inline-block p-4 ${activeTab === "room" ? "text-blue-600 rounded-ss-lg dark:text-blue-500" : "hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"}`}
          >
            Hotel Rooms
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("add-room")}
            type="button"
            role="tab"
            aria-controls="add-room"
            aria-selected={activeTab === "add-room"}
            className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            Add New Room
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("action")}
            type="button"
            role="tab"
            aria-controls="action"
            aria-selected={activeTab === "action"}
            className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            Action
          </button>
        </li>
      </ul>

      <div>
        {activeTab === "room" && (
          <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" role="tabpanel">
            table
          </div>
        )}

        {activeTab === "add-room" && (
          <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" role="tabpanel">
            <AddForm/>
          </div>
        )}

        {activeTab === "action" && (
          <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" role="tabpanel">
            table with action
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRoom

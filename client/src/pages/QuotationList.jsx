// client/src/pages/QuotationList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const QuotationList = () => {
  // Mock data for quotations
  const initialQuotations = [
    {
      id: "Q-2023-001",
      clientName: "Githui Kagema",
      services: ["Deluxe Room", "Airport Transfer", "Spa Package"],
      total: 1250.0,
      status: "Pending",
      createdAt: "2023-04-25",
      expiresAt: "2023-05-10",
    },
    {
      id: "Q-2023-002",
      clientName: "Winnie Njeri",
      services: ["Conference Room", "Catering", "Accommodation"],
      total: 3450.0,
      status: "Approved",
      createdAt: "2023-04-20",
      expiresAt: "2023-05-05",
    },
    {
      id: "Q-2023-003",
      clientName: "Michael Smith",
      services: ["Executive Suite", "Chauffeur Service"],
      total: 950.0,
      status: "Draft",
      createdAt: "2023-04-28",
      expiresAt: "2023-05-13",
    },
    {
      id: "Q-2023-004",
      clientName: "Emma Wilson",
      services: ["Standard Room", "Breakfast Package"],
      total: 680.0,
      status: "Expired",
      createdAt: "2023-03-15",
      expiresAt: "2023-03-30",
    },
    {
      id: "Q-2023-005",
      clientName: "Robert Brown",
      services: ["Wedding Package", "Honeymoon Suite"],
      total: 4200.0,
      status: "Approved",
      createdAt: "2023-04-10",
      expiresAt: "2023-04-25",
    },
  ];

  const [quotations, setQuotations] = useState(initialQuotations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter quotations based on search term and status
  const filteredQuotations = quotations.filter((quote) => {
    const matchesSearch =
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle delete quotation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      setQuotations(quotations.filter((quote) => quote.id !== id));
    }
  };

  // Status badge component with appropriate colors
  const StatusBadge = ({ status }) => {
    let badgeClass = "";

    switch (status) {
      case "Approved":
        badgeClass = "bg-green-100 text-green-800";
        break;
      case "Pending":
        badgeClass = "bg-yellow-100 text-yellow-800";
        break;
      case "Draft":
        badgeClass = "bg-blue-100 text-blue-800";
        break;
      case "Expired":
        badgeClass = "bg-red-100 text-red-800";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
    }

    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all your quotations and proposals in one place.
        </p>
      </div>

      {/* Filters and search */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
          <div className="w-full md:w-64">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="search"
                placeholder="Search quotations..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Expired">Expired</option>
            </select>
            <Link
              to="/quotations/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Quotation
            </Link>
          </div>
        </div>
      </div>

      {/* Quotations list */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quotation ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Services
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Validity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      <Link
                        to={`/quotations/${quotation.id}`}
                        className="hover:underline"
                      >
                        {quotation.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quotation.clientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {quotation.services.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {service}
                          </span>
                        ))}
                        {quotation.services.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{quotation.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${quotation.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={quotation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quotation.expiresAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/quotations/${quotation.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(quotation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No quotations found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotationList;

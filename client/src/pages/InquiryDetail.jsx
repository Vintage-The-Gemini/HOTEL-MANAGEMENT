// src/pages/InquiryDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserGroupIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  PaperClipIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Mock data for the demo
const mockInquiryDetails = {
  id: 'INQ-001',
  client: { 
    name: 'Acme Corporation', 
    email: 'info@acme.com',
    phone: '555-123-4567',
    organization: 'Acme Corporation',
    type: 'CORPORATE' 
  },
  eventDetails: {
    type: 'CONFERENCE',
    startDate: '2023-07-10',
    endDate: '2023-07-12',
    guestCount: 50,
    purpose: 'Annual Company Meeting'
  },
  requirements: {
    conferencing: {
      isRequired: true,
      roomCount: 2,
      setupStyle: 'Classroom',
      equipment: ['Projector', 'Microphone', 'Sound System'],
      refreshments: true
    },
    lodging: {
      isRequired: true,
      roomCount: 25,
      guestsPerRoom: 2,
      mealPlan: ['Breakfast', 'Lunch']
    },
    transport: {
      isRequired: false
    },
    additionalServices: ['Wi-Fi', 'Airport Pickup']
  },
  source: {
    channel: 'Website',
    campaign: 'Summer Promotion'
  },
  assignedTo: 'John Doe',
  status: 'QUALIFIED',
  notes: [
    { 
      text: 'Initial contact made. Client is interested in booking conference rooms and accommodation.', 
      addedBy: 'John Doe', 
      addedAt: '2023-05-15T09:30:00' 
    },
    { 
      text: 'Discussed room requirements and pricing. Client will get back with final attendee count.', 
      addedBy: 'John Doe', 
      addedAt: '2023-05-16T14:15:00' 
    },
    { 
      text: 'Client confirmed attendee count and dates. Preparing quotation.', 
      addedBy: 'John Doe', 
      addedAt: '2023-05-18T11:45:00' 
    }
  ],
  createdAt: '2023-05-15T08:00:00',
  updatedAt: '2023-05-18T11:45:00'
};

const InquiryDetail = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Simulate API call to fetch inquiry details
    const timer = setTimeout(() => {
      setInquiry(mockInquiryDetails);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
    
    // In a real app, you would fetch the data from your API
    // const fetchInquiryDetails = async () => {
    //   try {
    //     const response = await axios.get(`/api/inquiries/${id}`);
    //     setInquiry(response.data);
    //   } catch (error) {
    //     console.error('Error fetching inquiry details:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchInquiryDetails();
  }, [id]);

  const handleAddNote = (e) => {
    e.preventDefault();
    
    if (!newNote.trim()) return;
    
    // In a real app, you would send this to your API
    const noteToAdd = {
      text: newNote,
      addedBy: 'Current User',
      addedAt: new Date().toISOString()
    };
    
    setInquiry({
      ...inquiry,
      notes: [...inquiry.notes, noteToAdd]
    });
    
    setNewNote('');
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'NEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-800';
      case 'QUALIFIED':
        return 'bg-indigo-100 text-indigo-800';
      case 'QUOTATION_SENT':
        return 'bg-purple-100 text-purple-800';
      case 'CONVERTED':
        return 'bg-green-100 text-green-800';
      case 'LOST':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-0 flex items-center">
        <Link to="/inquiries" className="mr-2 text-primary-600 hover:text-primary-900">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Inquiry {inquiry.id}</h1>
        <span className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(inquiry.status)}`}>
          {formatStatus(inquiry.status)}
        </span>
      </div>
      
      <div className="mt-6">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Edit Inquiry
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Create Quotation
          </button>
          <div className="flex-grow"></div>
          <select
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            value={inquiry.status}
            onChange={() => {}}
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="QUOTATION_SENT">Quotation Sent</option>
            <option value="CONVERTED">Converted</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`${
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`${
                activeTab === 'requirements'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Requirements
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`${
                activeTab === 'notes'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notes
            </button>
          </nav>
        </div>
        
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Client Information</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Client name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {inquiry.client.name}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {inquiry.client.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {inquiry.client.phone}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Organization</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.client.organization}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Client type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {inquiry.client.type === 'CORPORATE' ? 'Corporate' : 'Individual'}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Event type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.eventDetails.type === 'CONFERENCE' ? 'Conference' : 
                       inquiry.eventDetails.type === 'LODGING' ? 'Lodging' : 'Mixed'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Start date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {new Date(inquiry.eventDetails.startDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">End date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {new Date(inquiry.eventDetails.endDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Guest count</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                      <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {inquiry.eventDetails.guestCount}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.eventDetails.purpose}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Source Information</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Channel</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.source.channel}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Campaign</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.source.campaign}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Assigned to</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {inquiry.assignedTo}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Created at</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Updated at</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(inquiry.updatedAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
        
        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Conference Requirements */}
            {inquiry.requirements.conferencing.isRequired && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Conference Requirements</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Room count</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.conferencing.roomCount}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Setup style</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.conferencing.setupStyle}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Equipment</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {inquiry.requirements.conferencing.equipment.map((item, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 flex-1 w-0 truncate">{item}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Refreshments</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.conferencing.refreshments ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            
            {/* Lodging Requirements */}
            {inquiry.requirements.lodging.isRequired && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Lodging Requirements</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Room count</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.lodging.roomCount}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Guests per room</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.lodging.guestsPerRoom}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Meal plan</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {inquiry.requirements.lodging.mealPlan.join(', ')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            
            {/* Additional Services */}
            {inquiry.requirements.additionalServices.length > 0 && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Services</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <div className="py-4 sm:py-5 sm:px-6">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {inquiry.requirements.additionalServices.map((service, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{service}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notes</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Communication history and important information about this inquiry.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <ul className="space-y-4">
                    {inquiry.notes.map((note, index) => (
                      <li key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-900">{note.text}</p>
                            <div className="mt-1 text-xs text-gray-500 flex items-center">
                              <span>{note.addedBy}</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(note.addedAt).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <form onSubmit={handleAddNote}>
                    <label htmlFor="new-note" className="block text-sm font-medium text-gray-700">
                      Add a note
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="new-note"
                        name="new-note"
                        rows={3}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add your note here..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Add Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryDetail;
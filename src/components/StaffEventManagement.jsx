import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import "../EventList.css";

function StaffEventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", location: "", date: "" });
  const [editEvent, setEditEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventsCollection);
      setEvents(eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      await addDoc(collection(db, "events"), {
        ...newEvent,
        date: new Date(newEvent.date),
        attendees: [],
      });
      alert("Event added successfully!");
      setNewEvent({ title: "", description: "", location: "", date: "" });
    } catch (error) {
      alert("Error adding event. Please try again.");
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent({
      ...event,
      date: new Date(event.date.seconds * 1000).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async () => {
    try {
      await updateDoc(doc(db, "events", editEvent.id), {
        title: editEvent.title,
        description: editEvent.description,
        location: editEvent.location,
        date: new Date(editEvent.date),
      });
      alert("Event updated!");
      setIsModalOpen(false);
      setEditEvent(null);
    } catch (error) {
      alert("Error updating event. Please try again.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        alert("Event deleted!");
        setEvents(events.filter((event) => event.id !== id));
      } catch (error) {
        alert("Error deleting event. Please try again.");
      }
    }
  };

  return (
    <div className="background">
      <h2 className="head">Manage Events</h2>

      <div className="head">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Event</h3>
        <input
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="block w-full p-3 sm:p-4 mb-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="block w-full p-3 sm:p-4 mb-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          placeholder="Event Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          className="block w-full p-3 sm:p-4 mb-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="block w-full p-3 sm:p-4 mb-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleAddEvent}
          className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600"
        >
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {events.map((event) => (
          <div key={event.id} className="box">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
            <p className="text-gray-600"><strong>Description:</strong> {event.description}</p>
            <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-600 mb-4"><strong>Date:</strong> {new Date(event.date.seconds * 1000).toLocaleString()}</p>
            <div className="flex justify-between">
              <button onClick={() => handleEditEvent(event)} className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Edit
              </button>
              <button onClick={() => handleDeleteEvent(event.id)} className="w-full sm:w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Edit Event</h3>

            <input
              value={editEvent.title}
              onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              className="block w-full p-3 sm:p-4 border rounded-md mb-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Event Title"
            />

            <textarea
              value={editEvent.description}
              onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              className="block w-full p-3 sm:p-4 border rounded-md mb-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Event Description"
            />

            <input
              type="datetime-local"
              value={editEvent.date}
              onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
              className="block w-full p-3 sm:p-4 border rounded-md mb-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button onClick={handleUpdateEvent} className="w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600">
                Save Changes
              </button>
              <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffEventManagement;

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { gapi } from "gapi-script";
import '../EventList.css';

function EventList({ user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCalendar, setAddedToCalendar] = useState([]);
  const [signedUpEvents, setSignedUpEvents] = useState([]);

  
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventList = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventList);

        
        if (user?.email) {
          const signedUp = eventList
            .filter((event) => event.attendees?.includes(user.email))
            .map((event) => event.id);
          setSignedUpEvents(signedUp);
        }
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]); 


  const handleSignUp = async (eventId) => {
    if (!user || !user.email) {
      alert("You must be logged in to sign up!");
      return;
    }

    try {
      const eventDoc = doc(db, "events", eventId);
      await updateDoc(eventDoc, {
        attendees: arrayUnion(user.email),
      });

      setSignedUpEvents((prev) => [...prev, eventId]);

      alert(" You have successfully signed up for the event!");
    } catch (err) {
      console.error(" Error signing up:", err);
      alert("Failed to sign up.");
    }
  };

  
  const handleAddToCalendar = async (event) => {
    const eventDetails = {
      summary: event.title,
      location: event.location,
      description: event.description,
      start: {
        dateTime: new Date(event.date.seconds * 1000).toISOString(),
      },
      end: {
        dateTime: new Date(event.date.seconds * 1000 + 60 * 60 * 1000).toISOString(),
      },
    };

    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: eventDetails,
      });

      setAddedToCalendar((prev) => [...prev, event.id]);
      alert(" Event added to Google Calendar!");
    } catch (err) {
      setError(" Error adding event to Google Calendar.");
    }
  };

  return (
    <div className="background">
      <h2 className="head">Available Events</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : events.length > 0 ? (
        <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="box" role="listitem" aria-label={`Event: ${event.title}`}>
              <div className="box-content">
                <h3 className="box-title">{event.title}</h3>
                <p className="text-gray-600"><strong>Description:</strong> {event.description}</p>

                {event.image && (
                  <img 
                    width="300"
                    height="200"
                    src={event.image} 
                    alt={`Image for ${event.title}`} 
                    className="event-image"
                  />
                )}

                <p className="text-gray-600"><strong>Date:</strong> {new Date(event.date.seconds * 1000).toLocaleString()}</p>
                <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>

                <div className="actions">
                  {signedUpEvents.includes(event.id) ? (
                    <button disabled className="btn btn-gray" aria-label={`Already signed up for ${event.title}`}>
                       Signed Up
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSignUp(event.id)}
                      className="btn btn-orange"
                      aria-label={`Sign up for ${event.title}`}
                    >
                      Sign Up
                    </button>
                  )}

                  {addedToCalendar.includes(event.id) ? (
                    <button disabled className="btn btn-gray" aria-label={`Already added ${event.title} to calendar`}>
                      Already Added
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCalendar(event)}
                      className="btn btn-green"
                      aria-label={`Add ${event.title} to calendar`}
                    >
                      Add to Calendar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventList;

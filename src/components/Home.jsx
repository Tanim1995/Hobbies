import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import EventList from "./EventsList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import StaffEventManagement from "./StaffEventManagement";
import '../EventList.css'
import logo from '../assets/hobbies.png'
function Home() {
  const [user] = useAuthState(auth); 
  const [role, setRole] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const idTokenResult = await auth.currentUser.getIdTokenResult();
          const userRole = idTokenResult.claims.role || "user"; 
          setRole(userRole);
        } catch (error) {
          console.error("Error", error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

 
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      alert("You have been signed out.");
      navigate("/"); 
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  
  const handleAddToCalendar = (event) => {
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

    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        gapi.client.calendar.events
          .insert({
            calendarId: "primary",
            resource: eventDetails,
          })
          .then(() => {
            alert("Event added to Google Calendar!");
          })
          .catch((error) => {
            console.error("Error adding event to Google Calendar:", error);
            alert("Failed to add event to Google Calendar.");
          });
      })
      .catch((error) => {
        console.error("Error during Google authentication:", error);
        alert("You must be signed in to add events to your calendar.");
      });
  };

  return (
    <div >
      
     
  


      {user ? (
        <>
        
          <div className="logo-container">
            
            <img src={logo} width="350"alt="Hobies Logo"  />
            <br></br>
            <button className="flex justify-center"
              onClick={handleSignOut}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                
              }}
            >
              Sign Out
            </button>
          </div>

          
          {role === "staff" && (
            <div>
              
              <StaffEventManagement /> 
            </div>
          )}

          
          <EventList user={user} onAddToCalendar={handleAddToCalendar} />
        </>
      ) : (
        <p>Please log in to view and sign up for events.</p>
      )}
    </div>
  );
}

export default Home;

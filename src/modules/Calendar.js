import React, { Component } from "react";
//npm install --save @fullcalendar/react @fullcalendar/daygrid
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./Calendar.css";
//npm install --save @fullcalendar/google-calendar
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default class DemoApp extends Component {
  render() {
    return (
      <div className="container">
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey={"AIzaSyCk7vhLZass7qxTKuZ_s95AK5d3UIvlqyo"}
          events={{
            googleCalendarId: "mokjohn98@gmail.com",
          }}
          eventDisplay={"block"}
          height={"600px"}
        />
      </div>
    );
  }
}

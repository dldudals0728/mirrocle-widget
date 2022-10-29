import React, { Component } from "react";
//npm install --save @fullcalendar/react @fullcalendar/daygrid
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./Calendar.css";
//npm install --save @fullcalendar/google-calendar
import googleCalendarPlugin from "@fullcalendar/google-calendar";

function Calendar(props) {
  const moniter_height = 746;

  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
  } = props;

  return (
    <div
      style={{
        left: `${positionleft * 20}%`,
        top: `${positiontop * 10}%`,
        position: "absolute",
        width: "60%",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={"AIzaSyCk7vhLZass7qxTKuZ_s95AK5d3UIvlqyo"}
        events={{
          googleCalendarId: "mokjohn98@gmail.com",
        }}
        eventDisplay={"block"}
        height={`${(moniter_height / 5) * widgetHeight}px`}
      />
    </div>
  );
}

export default Calendar;

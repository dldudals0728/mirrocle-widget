import React, { Component, useEffect, useState } from "react";
//npm install --save @fullcalendar/react @fullcalendar/daygrid
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./Calendar.css";
//npm install --save @fullcalendar/google-calendar
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { IP_ADDRESS } from "./IPAddress";

function Calendar(props) {
  const moniter_height = 720;
  const [gmail, setGmail] = useState("");
  const [googleCalendarAPI, setGoogleCalendarAPI] = useState("");

  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
    attribute,
  } = props;

  const getAPIKey = async () => {
    let url = IP_ADDRESS + "/api/select";
    url += `?name=calendar`;
    const res = await fetch(url);
    const json = await res.json();
    setGoogleCalendarAPI(json.api_key);
  };

  useEffect(() => {
    setGmail(attribute.gMail);
  }, [attribute]);

  useEffect(() => {
    getAPIKey();
  }, []);

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
        googleCalendarApiKey={googleCalendarAPI}
        events={{
          googleCalendarId: gmail,
          // googleCalendarId: "mokjohn98@gmail.com",
        }}
        eventDisplay={"block"}
        height={`${(moniter_height / 5) * widgetHeight}px`}
      />
    </div>
  );
}

export default Calendar;

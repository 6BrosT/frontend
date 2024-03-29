import { DateSelectArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Tooltip } from "@mui/material";
import TextTitle from "components/text/TextTitle";
import "./index.scss";
import ParagraphBody from "components/text/ParagraphBody";
import ParagraphExtraSmall from "components/text/ParagraphExtraSmall";
import viLocale from "@fullcalendar/core/locales/vi";
import enLocale from "@fullcalendar/core/locales/en-gb";
import i18next from "i18next";
import { useEffect, useState } from "react";

interface CustomFullCalendarProps {
  events: any[];
  handleDateSelect?: (selectInfo: DateSelectArg) => void;
  editable?: boolean;
}

export default function CustomFullCalendar({
  events,
  handleDateSelect,
  editable
}: CustomFullCalendarProps) {
  const [currentLang, setCurrentLang] = useState(() => {
    return i18next.language;
  });

  useEffect(() => {
    setCurrentLang(i18next.language);
  }, [i18next.language]);

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          initialView='dayGridMonth'
          editable={editable || false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={function () {}}
          events={events}
          locale={currentLang === "en" ? enLocale : viLocale}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <Tooltip title={eventContent.event.title} placement='top-start'>
      <Box
        sx={{
          padding: "5px"
        }}
      >
        <ParagraphExtraSmall fontSize={"12px"}>{eventContent.timeText}</ParagraphExtraSmall>
        <TextTitle
          color='white'
          textWrap='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          fontSize='13px'
        >
          {eventContent.event.title}
        </TextTitle>
        <ParagraphBody fontSize={"12px"} colorname='grey'>
          {eventContent.event.extendedProps.description || "No description"}
        </ParagraphBody>
      </Box>
    </Tooltip>
  );
}

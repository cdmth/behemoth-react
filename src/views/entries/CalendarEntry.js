import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { countHours } from '../../helpers/Timehelper'


import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

function Event({ event }) {
  return (
    <span>
      <span className="">
        <p className="">{event.name}</p>
        <p className="">{event.description}</p>
      </span>
      <p className=""><strong className="">{countHours(event.start, event.end)}</strong></p>
    </span>
  )
}

class CalendarEntry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      view: "week"
    };
  }

  render() {
    const minTime = new Date();
    minTime.setHours(20, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(23, 0, 0);

    const { view } = this.state
    const { onSelectSlot, handleEntryClick, entries } = this.props

    return (
      <div style={{ height: "100%" }}>
        <BigCalendar
          view={view}
          onView={(e) => this.setState({view: e})}
          views={["week", "month"]}
          localizer={localizer}
          events={entries}
          min={minTime}
          selectable
          onSelectSlot={times => onSelectSlot(times)}
          onSelectEvent={entry => handleEntryClick(entry)}
          components={{
            event: Event
          }}
        />
      </div>
    );
  }
}

export default CalendarEntry;

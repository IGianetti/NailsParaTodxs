import React, { useState } from "react";
import "./calendar.css";

const Calendar = ({ onDayClick, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const getFirstDayOfMonth = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    return firstDay.getDay();
  };

  const getDaysInMonth = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    return daysInMonth;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isWeekend =
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ).getDay() === 0 ||
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ).getDay() === 6;
      const isDisabled = isWeekend; // Bloquear sábados y domingos
      const isSelected = selectedDay === day;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isWeekend ? "weekend" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => !isDisabled && handleDayClick(day)}
          style={{ cursor: isDisabled ? "default" : "pointer" }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDayClick(selectedDate);
  };

  return (
    <div className="calendar-container">
      <h2>{currentDate.toLocaleString("default", { month: "long" })}</h2>
      <div>{currentDate.getFullYear()}</div>
      <div className="calendar-days">{renderCalendarDays()}</div>
      <div className="selected-date">
        {selectedDate && <p>Día seleccionado: {selectedDate.toDateString()}</p>}
      </div>
    </div>
  );
};

export default Calendar;

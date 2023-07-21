import "./calendar.css";
import React, { useState } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const getFirstDayOfMonth = () => {
    const currentDate = new Date();
    currentDate.setDate(1);
    return currentDate.getDay();
  };

  const getDaysInMonth = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return new Date(year, month, 0).getDate();
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const renderWeekdays = () => {
    const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    return weekdays.map((weekday, index) => (
      <div key={index} className="weekday">
        {weekday}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date();
      date.setDate(day);

      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isDisabled = isWeekend; // Bloquear sábados y domingos

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isWeekend ? "weekend" : ""}`}
          onClick={() => !isDisabled && handleDayClick(day)}
          style={{ cursor: isDisabled ? "default" : "pointer" }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  const getCurrentMonthName = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const currentDate = new Date();
    return months[currentDate.getMonth()];
  };

  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  return (
    <div className="calendar-container">
      <h2>{getCurrentMonthName()}</h2>
      <div>{getCurrentYear()}</div>
      <div className="weekdays-container">{renderWeekdays()}</div>
      <div className="calendar-days">{renderCalendarDays()}</div>
      <div className="selected-date">
        {selectedDate ? (
          <p>
            Día seleccionado:{" "}
            {formatDate(
              new Date(getCurrentYear(), new Date().getMonth(), selectedDate)
            )}
          </p>
        ) : (
          <p>Selecciona un día</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;

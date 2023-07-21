import React, { useState } from "react";
import Calendar from "../calendar/Calendar";
import "./formTurnos.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const FormTurnos = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [tipoTurno, setTipoTurno] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNombreChange = (event) => {
    setNombreCompleto(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCelularChange = (event) => {
    setCelular(event.target.value);
  };

  const handleTipoTurnoChange = (event) => {
    setTipoTurno(event.target.value);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a la base de datos o realizar alguna acción adicional.
    console.log({
      nombreCompleto,
      email,
      celular,
      tipoTurno,
      selectedDate: selectedDate ? new Date(selectedDate) : null,
    });
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <TextField
        label="Nombre Completo"
        variant="outlined"
        value={nombreCompleto}
        onChange={handleNombreChange}
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        fullWidth
      />
      <TextField
        label="Celular"
        variant="outlined"
        value={celular}
        onChange={handleCelularChange}
        fullWidth
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Tipo de Turno</InputLabel>
        <Select
          value={tipoTurno}
          onChange={handleTipoTurnoChange}
          label="Tipo de Turno"
        >
          <MenuItem value="local">En Local</MenuItem>
          <MenuItem value="domicilio">A Domicilio</MenuItem>
        </Select>
      </FormControl>
      <Calendar onDayClick={handleDayClick} selectedDate={selectedDate} />
      <div className="buttonContainer">
        <Button type="submit" variant="contained" color="primary">
          Solicitar Turno
        </Button>
      </div>
    </form>
  );
};

export default FormTurnos;

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
  FormHelperText,
} from "@mui/material";

import { db } from "../../firebase/firebaseConfig"; // Importa firestore desde tu archivo firebaseConfig.js
import { collection, addDoc } from "firebase/firestore";

const FormTurnos = ({ handleClose }) => {
  const [formValues, setFormValues] = useState({
    nombreCompleto: "",
    email: "",
    celular: "",
    tipoTurno: "",
    selectedDate: null,
    horario: "",
  });

  const [formErrors, setFormErrors] = useState({
    nombreCompleto: "",
    email: "",
    celular: "",
    tipoTurno: "",
    selectedDate: "",
    horario: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleDayClick = (day) => {
    setFormValues({ ...formValues, selectedDate: day });
    setFormErrors({ ...formErrors, selectedDate: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.nombreCompleto) {
      errors.nombreCompleto = "Es obligatorio";
    }

    if (!formValues.email) {
      errors.email = "Es obligatorio";
    }

    if (!formValues.celular) {
      errors.celular = "Es obligatorio";
    }

    if (!formValues.tipoTurno) {
      errors.tipoTurno = "Es obligatorio";
    }

    if (!formValues.selectedDate) {
      errors.selectedDate = "Es obligatorio";
    }

    if (!formValues.horario) {
      errors.horario = "Es obligatorio";
    }

    setFormErrors(errors);

    // El formulario es válido si no hay mensajes de error en el estado formErrors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const selectedTimestamp = formValues.selectedDate
        ? formValues.selectedDate.getTime()
        : null;

      try {
        // Envía los datos del formulario a Firestore en la colección "turnos".
        await addDoc(collection(db, "turnos"), {
          nombreCompleto: formValues.nombreCompleto,
          email: formValues.email,
          celular: formValues.celular,
          tipoTurno: formValues.tipoTurno,
          selectedDate: selectedTimestamp,
          horario: formValues.horario,
        });

        console.log("Turno enviado correctamente");
      } catch (error) {
        console.error("Error al enviar el turno", error);
      }
    } else {
      console.log("El formulario tiene un error");
    }

    handleClose();
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <TextField
        label="Nombre Completo"
        variant="outlined"
        name="nombreCompleto"
        value={formValues.nombreCompleto}
        onChange={handleInputChange}
        fullWidth
        error={!!formErrors.nombreCompleto}
        helperText={formErrors.nombreCompleto}
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
        fullWidth
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <TextField
        label="Celular"
        variant="outlined"
        name="celular"
        value={formValues.celular}
        onChange={handleInputChange}
        fullWidth
        error={!!formErrors.celular}
        helperText={formErrors.celular}
      />
      <FormControl variant="outlined" fullWidth error={!!formErrors.tipoTurno}>
        <InputLabel>Tipo de Turno</InputLabel>
        <Select
          name="tipoTurno"
          value={formValues.tipoTurno}
          onChange={handleInputChange}
          label="Tipo de Turno"
        >
          <MenuItem value="local">En Local</MenuItem>
          <MenuItem value="domicilio">A Domicilio</MenuItem>
        </Select>
        <FormHelperText>{formErrors.tipoTurno}</FormHelperText>
      </FormControl>
      <Calendar
        onDayClick={handleDayClick}
        selectedDate={formValues.selectedDate}
        error={!!formErrors.selectedDate}
        helperText={formErrors.selectedDate}
      />
      <FormControl variant="outlined" fullWidth error={!!formErrors.horario}>
        <InputLabel>Horario</InputLabel>
        <Select
          name="horario"
          value={formValues.horario}
          onChange={handleInputChange}
          label="Horario"
        >
          <MenuItem value="09:00">09:00hs</MenuItem>
          <MenuItem value="10:00">10:00hs</MenuItem>
          <MenuItem value="11:00">11:00hs</MenuItem>
          <MenuItem value="12:00">12:00hs</MenuItem>
          <MenuItem value="13:00">13:00hs</MenuItem>
          <MenuItem value="14:00">14:00hs</MenuItem>
          <MenuItem value="15:00">15:00hs</MenuItem>
          <MenuItem value="16:00">16:00hs</MenuItem>
          <MenuItem value="17:00">17:00hs</MenuItem>
        </Select>
        <FormHelperText>{formErrors.horario}</FormHelperText>
      </FormControl>
      <div className="buttonContainer">
        <Button type="submit" variant="contained" color="primary">
          Solicitar Turno
        </Button>
      </div>
    </form>
  );
};

export default FormTurnos;

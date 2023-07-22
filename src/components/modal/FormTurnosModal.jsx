import React, { useState } from "react";
import { Button, Modal, Backdrop, Fade } from "@mui/material";
import FormTurnos from "../form/FormTurnos";
import "./formTurnosModal.css"; // Importa el archivo CSS de estilos

const FormTurnosModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          marginRight: 10,
        }}
      >
        Agendar Turno
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        backdrop={Backdrop}
        sx={{
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <Fade in={open}>
          <div className="modal-container">
            <div className="modal-content">
              <div className="close-button">
                <button onClick={handleClose}>Cerrar</button>
              </div>
              <FormTurnos handleClose={handleClose} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormTurnosModal;

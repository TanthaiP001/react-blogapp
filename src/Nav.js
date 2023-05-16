import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleButtonClick = () => {
    window.location.href = "/";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4D4861" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleButtonClick}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blogs
            </Typography>
          </Button>
          <Button color="inherit" onClick={handleOpen}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Exit
            </Typography>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                You are exiting this Blog Page
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                And why are you still here?
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
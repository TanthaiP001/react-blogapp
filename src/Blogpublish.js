import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function BlogUpdate() {
  const { id } = useParams();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://dev.opensource-technology.com:3000/api/posts/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFname(result.title);
        setLname(result.content);
        setEmail(result.published);
        setAvatar(result.created_at);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "published": true,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://dev.opensource-technology.com:3000/api/posts/"+id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert("Update Content Success!!");
        if (result["status"] === "ok") {
          window.location.href = "/";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [title, setFname] = useState("");
  const [content, setLname] = useState("");
  const [published, setEmail] = useState("");
  const [created_at, setAvatar] = useState("");

  const handleButtonClick = () => {
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Update Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fname"
                label="Title"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFname(e.target.value)}
                value={title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lname"
                label="Content"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                onChange={(e) => setLname(e.target.value)}
                value={content}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: "#605770", color: "white" }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleButtonClick}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: "#D56062", color: "white" }}
                onClick={handleSubmit}
              >
                PUBLISH
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

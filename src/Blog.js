import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import { ButtonGroup } from "@mui/material";

export default function Blog() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    BlogGet();
  }, []);

  const BlogGet = () => {
    fetch("http://dev.opensource-technology.com:3000/api/posts")
      .then((res) => res.json())
      .then((result) => {
        setItems(result.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const UserUpdate = (id) => {
    window.location = "/update/" + id;
  };
  const goDraft = () => {
    window.location = "draft";
  };

  const UserDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://dev.opensource-technology.com:3000/api/posts/" + id,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON if response is successful
        } else {
          throw new Error("Error deleting post");
        }
      })
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          BlogGet();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
      <Box alignItems="center">Publish Page</Box>  
        <Paper
          sx={{ p: 2 }}
          style={{ backgroundColor: "#9E7682", color: "white" }}
        >
          <Box display="flex">
            <Link href="/">
              <Button
                variant="contained"
                style={{ backgroundColor: "#9E7682", color: "white" }}
                sx={{ flexGrow: 1 }}
              >
                Blog
              </Button>
            </Link>
            <Link href="draft">
              <Button
                variant="contained"
                style={{ backgroundColor: "#7D5E67", color: "white" }}
                sx={{ flexGrow: 1 }}
              >
                Draft
              </Button>
            </Link>
            <Box sx={{ marginLeft: "auto" }}>
              <Link href="create">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#605770", color: "white" }}
                >
                  Create
                </Button>
              </Link>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Content</TableCell>
                  <TableCell align="right">Published</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.content}</TableCell>
                    <TableCell align="right">
                      {row.published.toString()}
                    </TableCell>
                    <TableCell align="right">{row.created_at}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={() => UserUpdate(row.id)}>EDIT</Button>
                        <Button onClick={() => UserDelete(row.id)}>DEL</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

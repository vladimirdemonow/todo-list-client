import "./App.css";
import { Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id: string, name: string, date: string) {
  return { id, name, date };
}

const rows = [createData("555", "Study harder", "28.01.22")];

const labelCheck = { inputProps: { "aria-label": "Checkbox demo" } };

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h3" component="h1">
        ToDo
      </Typography>
      <CssBaseline />
      <TextField id="standard-basic" label="i want to..." variant="standard" />
      <CssBaseline />
      <Stack spacing={0} direction="row">
        <Button variant="contained">All</Button>
        <Button variant="contained" color="success">
          Done
        </Button>
        <Button variant="contained" color="error">
          Undone
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox {...labelCheck} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MOST_RENTED_FILMS_ENDPOINT } from "../utils/urls";

function MostRentedFilms() {
  const [films, setFilms] = useState<{ title: string; rentalCount: number }[]>(
    []
  );
  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch(MOST_RENTED_FILMS_ENDPOINT);
      const data = await response.json();
      setFilms(data.topRentedFilms);
    };
    void fetchFilms();
  }, []);

  return (
    <TableContainer component={Paper}>
      <h2>Most Rented Films</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Rental Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {films.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.rentalCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MostRentedFilms;

import FilmCategories from "../charts/FilmCategories";
import MostRentedFilms from "../charts/MostRentedFilms";
import GoToMainPageButton from "../components/GoToMainPageButton";

function Charts() {
  return (
    <>
      <GoToMainPageButton />
      <FilmCategories />
      <MostRentedFilms />
    </>
  );
}

export default Charts;

import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { CATEGORIES_COUNT_ENDPOINT } from "../utils/urls";

function FilmCategories() {
  const [categoriesCount, setCategoriesCount] = useState<
    { name: string; count: number }[]
  >([]);

  useEffect(() => {
    const fetchFilmsData = async () => {
      const response = await fetch(CATEGORIES_COUNT_ENDPOINT);
      const data = await response.json();
      setCategoriesCount(data.categoriesCount);
    };
    void fetchFilmsData();
  }, []);

  return (
    <>
      <h2>Film Categories</h2>
      <BarChart
        width={1000}
        height={400}
        dataset={categoriesCount}
        xAxis={[
          {
            dataKey: "name",
            scaleType: "band",
          },
        ]}
        series={[
          {
            dataKey: "count",
          },
        ]}
      />
    </>
  );
}

export default FilmCategories;

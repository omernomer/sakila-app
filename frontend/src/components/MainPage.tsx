import { Button, Stack } from "@mui/material";
import { CHARTS_PATH, USERS_PATH } from "../utils/urls";

function MainPage() {
  return (
    <Stack direction="row" gap={2}>
      <Button variant="contained" color="primary" href={USERS_PATH}>
        Users
      </Button>
      <Button variant="contained" color="primary" href={CHARTS_PATH}>
        Charts
      </Button>
    </Stack>
  );
}

export default MainPage;

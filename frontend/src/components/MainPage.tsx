import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";

function MainPage() {
  const navigate = useNavigate();
  return (
    <Stack direction="row" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/users")}
      >
        Users
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/charts")}
      >
        Charts
      </Button>
    </Stack>
  );
}

export default MainPage;

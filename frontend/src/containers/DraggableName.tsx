import { Typography } from "@mui/material";
import Draggable from "../components/Dragable";

const styles = {
  customerName: {
    border: "thin solid grey",
    p: 1,
    m: 0.5,
  },
};

interface DraggableNameProps {
  id: string | number;
  name: string;
  disabled?: boolean;
}

function DraggableName({ id, name, disabled = false }: DraggableNameProps) {
  return (
    <Draggable key={id} id={id} disabled={disabled}>
      <Typography key={id} sx={styles.customerName}>
        {name}
      </Typography>
    </Draggable>
  );
}

export default DraggableName;

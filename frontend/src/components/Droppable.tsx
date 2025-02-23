import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(5px)",
  },
  dropHere: {
    position: "absolute",
    top: "50vh",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
  },
};

interface DroppableProps {
  id: string;
  children: ReactNode;
}

function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  return (
    <Box ref={setNodeRef} sx={{ position: "relative" }}>
      {isOver && (
        <Box sx={styles.container}>
          <Typography variant="h6" sx={styles.dropHere}>
            Drop here
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
}

export default Droppable;

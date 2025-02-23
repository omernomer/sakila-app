import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

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
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "50vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            Drop here
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
}

export default Droppable;

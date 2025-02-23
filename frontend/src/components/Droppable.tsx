import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children: ReactNode;
}

function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return <Box ref={setNodeRef}>{children}</Box>;
}

export default Droppable;

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Draggable from "./components/Dragable";
import Droppable from "./components/Droppable";
import { UPDATE_USER_STATUS_URL, USERS_URL } from "./utils/urls";

type User = {
  customer_id: number;
  first_name: string;
  last_name: string;
  active: boolean;
};

function Users() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    const response = await fetch(USERS_URL);
    const data = await response.json();
    setActiveUsers(data.activeUsers);
    setInactiveUsers(data.inactiveUsers);
    setLoading(false);
  };
  useEffect(() => {
    void fetchUsers();
  }, []);
  const updateUserStatus = async (id: number, active: boolean) => {
    await fetch(UPDATE_USER_STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, active }),
    });
    await fetchUsers();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.over && event.over.id === "inactive-users") {
      await updateUserStatus(event.active.id as number, false);
    }
    if (event.over && event.over.id === "active-users") {
      await updateUserStatus(event.active.id as number, true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Stack direction="row">
        <Droppable id="active-users">
          <Stack>
            <Typography variant="body1">Active Users</Typography>
            {activeUsers.length > 0 &&
              activeUsers.map(
                (user: User) =>
                  user.active && (
                    <Draggable key={user?.customer_id} id={user?.customer_id}>
                      <Typography
                        key={user?.customer_id}
                        sx={{ border: "thin solid grey", p: 1, m: 0.5 }}
                      >
                        {user?.first_name} {user?.last_name}
                      </Typography>
                    </Draggable>
                  )
              )}
          </Stack>
        </Droppable>
        <Droppable id="inactive-users">
          <Stack sx={{ border: "thin solid black" }}>
            <Typography variant="body1">Inactive Users</Typography>
            {inactiveUsers.length > 0 &&
              inactiveUsers.map(
                (user: User) =>
                  !user.active && (
                    <Draggable key={user?.customer_id} id={user?.customer_id}>
                      <Typography
                        key={user?.customer_id}
                        sx={{ border: "thin solid grey", p: 1, m: 0.5 }}
                      >
                        {user?.first_name} {user?.last_name}
                      </Typography>
                    </Draggable>
                  )
              )}
          </Stack>
        </Droppable>
      </Stack>
    </DndContext>
  );
}

export default Users;

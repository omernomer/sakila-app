import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Droppable from "../components/Droppable";
import GoToMainPageButton from "../components/GoToMainPageButton";
import { UPDATE_USER_STATUS_ENDPOINT, USERS_ENDPOINT } from "../utils/urls";
import DraggableName from "./DraggableName";

const styles = {
  activeUsers: {
    backgroundColor: "lightgreen",
    fontWeight: "bold",
  },
  inactiveUsers: {
    backgroundColor: "lightcoral",
    fontWeight: "bold",
  },
};

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
  const [listLoading, setListLoading] = useState(false);
  const fetchUsers = async () => {
    const response = await fetch(USERS_ENDPOINT);
    const data = await response.json();
    setActiveUsers(data.activeUsers);
    setInactiveUsers(data.inactiveUsers);
    setLoading(false);
  };
  useEffect(() => {
    void fetchUsers();
  }, []);
  const updateUserStatus = async (id: number, active: boolean) => {
    setListLoading(true);
    await fetch(UPDATE_USER_STATUS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, active }),
    });
    await fetchUsers().finally(() => setListLoading(false));
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
      <GoToMainPageButton />
      {listLoading && <LinearProgress />}
      <Stack direction="row" gap={2}>
        <Droppable id="active-users">
          <Stack>
            <Typography variant="body1" sx={styles.activeUsers}>
              Active Users
            </Typography>
            {activeUsers.length > 0 &&
              activeUsers.map(
                (user: User) =>
                  user.active && (
                    <DraggableName
                      key={user?.customer_id}
                      id={user?.customer_id}
                      name={`${user?.first_name} ${user?.last_name}`}
                      disabled={listLoading}
                    />
                  )
              )}
          </Stack>
        </Droppable>
        <Droppable id="inactive-users">
          <Stack>
            <Typography variant="body1" sx={styles.inactiveUsers}>
              Inactive Users
            </Typography>
            {inactiveUsers.length > 0 &&
              inactiveUsers.map(
                (user: User) =>
                  !user.active && (
                    <DraggableName
                      key={user?.customer_id}
                      id={user?.customer_id}
                      name={`${user?.first_name} ${user?.last_name}`}
                      disabled={listLoading}
                    />
                  )
              )}
          </Stack>
        </Droppable>
      </Stack>
    </DndContext>
  );
}

export default Users;

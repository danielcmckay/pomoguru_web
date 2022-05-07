import "./App.css";
import { AppShell, Grid, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { AppHeader } from "./components/app-header";
import { TodoContainer } from "./components/todo-container";
import { TimerContainer } from "./components/timer-container";
import { AuthPage } from "./pages/auth-page";
import { fetchItems, postItem } from "./utils/api-utils";
import { useLocalStorage } from "./utils/use-local-storage";
import { signOut } from "./utils/auth-utils";
import { NotificationsProvider } from "@mantine/notifications";

export interface Task {
  name: string;
  project: string;
  completed: boolean;
  _id: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<{
    loggedIn: boolean;
    type: "cloud" | "local" | undefined;
  }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<string[]>(["house", "work"]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [setItem, getItem] = useLocalStorage();

  const getItems = async () => {
    setTasks(await fetchItems("http://localhost:8000/tasks/tasks"));
  };

  const getLsItems = () => {
    const items = JSON.parse(getItem("tasks") ?? "");
    setTasks(items);
  };

  useEffect(() => {
    if (isLoggedIn?.loggedIn && isLoggedIn.type === "cloud") {
      getItems();
    } else if (isLoggedIn?.loggedIn && isLoggedIn.type === "local") {
      getLsItems();
    } else {
      setTasks([]);
    }
  }, [isLoggedIn]);

  return !isLoggedIn?.loggedIn ? (
    <AppShell>
      <AuthPage
        updateAuthStatus={(isLoggedIn, type) =>
          setIsLoggedIn({ loggedIn: isLoggedIn, type: type })
        }
      />
    </AppShell>
  ) : (
    <MantineProvider>
      <NotificationsProvider>
        <AppShell
          header={
            <AppHeader
              signoutFn={() => {
                signOut("");
                setIsLoggedIn({ loggedIn: false, type: undefined });
              }}
            />
          }
          style={{ height: "100%" }}
        >
          <Grid>
            <Grid.Col span={4}>
              <TodoContainer
                tags={tags}
                tasks={tasks}
                selectedTask={selectedTask}
                addOrUpdateTasks={async (data) => {
                  if (isLoggedIn.type === "cloud") {
                    await postItem("http://localhost:8000/tasks/task/", data);
                    getItems();
                  } else {
                    setItem("tasks", JSON.stringify([...tasks, data]));
                    setTasks((prev) => [
                      ...prev,
                      { ...data, _id: "adsfad", completed: false },
                    ]);
                  }
                }}
                addTag={(tag) => setTags((prev) => [...prev, tag])}
                updateSelectedTask={(task) => setSelectedTask(task)}
                triggerUpdate={() => getItems()}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <TimerContainer />
            </Grid.Col>
          </Grid>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;

import "./App.css";
import {
  AppShell,
  Autocomplete,
  Badge,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Grid,
  Group,
  Header,
  Stack,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useInterval } from "@mantine/hooks";

export interface Task {
  name: string;
  project: string;
  complete: boolean;
  id: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { name: "Clean house", project: "house", complete: false, id: "1" },
    { name: "Wipe counters", project: "house", complete: false, id: "2" },
  ]);
  const [tags, setTags] = useState<string[]>(["house", "work"]);
  const [timer, setTimer] = useState<number>(60 * 25);
  const interval = useInterval(() => setTimer((s) => s - 1), 1000);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const h = Math.floor(timer / 60);
  const m = timer % 60;

  const form = useForm({
    initialValues: {
      name: "",
      project: "",
    },

    validate: {},
  });

  useEffect(() => {
    interval.stop();
    return interval.start;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell
      header={
        <Header height={60}>
          <div className="nav-container">
            <h1>pomoguru</h1>
            <Group>
              <li>
                <a href="#">history</a>
              </li>
              <li>
                <a href="#">stats</a>
              </li>
              <li>
                <a href="#">account</a>
              </li>
            </Group>
          </div>
        </Header>
      }
    >
      <Container>
        <Grid>
          <Grid.Col span={4}>
            <Center>
              <Stack>
                <form
                  onSubmit={form.onSubmit((values) => {
                    if (!tags.includes(values.project)) {
                      setTags([...tags, values.project]);
                    }

                    setTasks((prev) => [
                      ...prev,
                      {
                        name: values.name,
                        project: values.project,
                        complete: false,
                        id: "3",
                      },
                    ]);

                    form.setValues({
                      name: "",
                      project: "",
                    });
                  })}
                >
                  <Stack>
                    <TextInput
                      placeholder="e.g., write those expense reports"
                      label="New task"
                      {...form.getInputProps("name")}
                    />
                    <Autocomplete
                      label="Project (existing or add a new project)"
                      placeholder="e.g., work"
                      data={tags}
                      {...form.getInputProps("project")}
                    />
                    <Button type="submit">Add</Button>
                  </Stack>
                </form>

                <Stack>
                  {tasks.map((task) => (
                    <Card
                      shadow="sm"
                      p="lg"
                      key={task.id}
                      withBorder={selectedTask?.id === task.id}
                      onClick={() => {
                        setSelectedTask(task);
                      }}
                    >
                      <Stack>
                        <Card.Section>
                          <Checkbox
                            checked={task.complete}
                            label={task.name}
                            onChange={(value) =>
                              setTasks((prev) => [
                                ...prev.filter((i) => i.id !== task.id),
                                { ...task, complete: value.target.checked },
                              ])
                            }
                          />
                        </Card.Section>
                        <Card.Section>
                          <Badge>{task.project}</Badge>
                        </Card.Section>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col span={8}>
            <Center>
              <Stack>
                <Center>
                  <h1 className="timer-counter">{`${h}:${
                    m < 10 ? `0${m}` : `${m}`
                  }`}</h1>
                </Center>
                <Center>
                  <Group>
                    <Button
                      color={interval.active ? "gray" : "green"}
                      onClick={interval.toggle}
                    >
                      {interval.active ? "Pause" : "Start"}
                    </Button>
                    <Button color="red">Reset</Button>
                  </Group>
                </Center>
              </Stack>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}

export default App;

import {
  Container,
  Stack,
  TextInput,
  Autocomplete,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Task } from "../App";
import { TodoCard } from "./todo-card";

export const TodoContainer = (props: {
  tasks: Task[];
  tags: string[];
  selectedTask: Task | undefined;
  addOrUpdateTasks: (update: { name: string; project: string }) => void;
  addTag: (tag: string) => void;
  updateSelectedTask: (task: any) => void;
  triggerUpdate: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      name: "",
      project: "",
    },

    validate: {},
  });

  return (
    <Container p="sm" fluid>
      <Stack>
        <form
          onSubmit={form.onSubmit((values) => {
            setLoading(true);
            if (!props.tags.includes(values.project)) {
              props.addTag(values.project);
            }

            props.addOrUpdateTasks({
              name: values.name,
              project: values.project,
            });

            form.setValues({
              name: "",
              project: "",
            });
            setLoading(false);
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
              data={props.tags}
              {...form.getInputProps("project")}
            />
            <Button type="submit" loading={loading}>
              Add
            </Button>
          </Stack>
        </form>

        <Stack style={{ overflow: "scroll" }}>
          {props.tasks &&
            props.tasks.map((task) => (
              <TodoCard
                key={task._id}
                task={task}
                isSelected={props.selectedTask?._id === task._id}
                updateSelectedTask={() => props.updateSelectedTask(task)}
                triggerUpdate={props.triggerUpdate}
              />
            ))}
        </Stack>
      </Stack>
    </Container>
  );
};

import { Card, Stack, Group, Checkbox, Button, Badge } from "@mantine/core";
import { useState } from "react";
import { Task } from "../App";
import { putItem, deleteItem } from "../utils/api-utils";

export const TodoCard = (props: {
  task: Task;
  isSelected: boolean;
  updateSelectedTask: () => void;
  triggerUpdate: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Card
      // style={{ background: props.isSelected ? "#adadad" : "none" }}
      shadow="sm"
      p="lg"
      key={props.task._id}
      withBorder
      onClick={() => {
        props.updateSelectedTask();
      }}
    >
      <Stack>
        <Card.Section>
          <Group position="apart">
            <Checkbox
              checked={props.task.completed}
              label={
                <p
                  style={{
                    textDecoration: props.task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {props.task.name}
                </p>
              }
              onChange={async (event) => {
                console.log("checked");

                setLoading(() => true);
                await putItem(
                  `http://localhost:8000/tasks/task/${props.task._id}`,
                  {
                    completed: event.currentTarget.checked,
                  }
                );
                props.triggerUpdate();
                setLoading(() => false);
              }}
            />
            <Button
              color="red"
              onClick={async () => {
                setLoading(() => true);
                await deleteItem(
                  `http://localhost:8000/tasks/task/${props.task._id}`
                );
                props.triggerUpdate();
                setLoading(() => false);
              }}
            >
              Delete
            </Button>
          </Group>
        </Card.Section>
        <Card.Section>
          <Badge>{props.task.project}</Badge>
        </Card.Section>
      </Stack>
    </Card>
  );
};

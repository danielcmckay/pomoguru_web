import { Center, Stack, Group, Button, Progress } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const TimerContainer = () => {
  const [timer, setTimer] = useState<number>(5);
  const interval = useInterval(() => setTimer((s) => s - 1), 1000);

  useEffect(() => {
    interval.stop();
    return interval.start;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer === 0) {
      interval.stop();
      const audio = new Audio("../../public/assets/notification-bell.wav");
      audio.load();
      showNotification({
        title: "Session finished!",
        message: "Time to take a break?",
        color: "red",
      });

      audio.play();
    }
  }, [timer]);

  const h = Math.floor(timer / 60);
  const m = timer % 60;

  return (
    <Center>
      <Stack>
        <Progress />
        <Center>
          <h1 className="timer-counter">{`${h}:${
            m < 10 ? `0${m}` : `${m}`
          }`}</h1>
        </Center>
        <Center>
          <Group>
            <Button
              color={interval.active ? "gray" : "green"}
              onClick={() => {
                if (timer > 0) {
                  interval.toggle();
                }
              }}
            >
              {interval.active ? "Pause" : "Start"}
            </Button>
            <Button
              color="red"
              onClick={() => {
                interval.stop();
                setTimer(10);
              }}
            >
              Reset
            </Button>
          </Group>
        </Center>
      </Stack>
    </Center>
  );
};

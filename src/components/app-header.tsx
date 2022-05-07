import { Header, Group, Popover } from "@mantine/core";
import { useState } from "react";

export const AppHeader = (props: {
  signoutFn: () => void
}) => {
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
  return (
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
            <Popover
              opened={popoverOpened}
              position="bottom"
              target={
                <a href="#" onClick={() => setPopoverOpened((prev) => !prev)}>
                  account
                </a>
              }
            >
              <a href="#" onClick={() => props.signoutFn()}>sign out</a>
            </Popover>
          </li>
        </Group>
      </div>
    </Header>
  );
};

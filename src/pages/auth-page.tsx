import {
  Button,
  Card,
  Center,
  Image,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { logIn, signIn } from "../utils/auth-utils";

export const AuthPage = (props: {
  updateAuthStatus: (status: boolean, type: "cloud" | "local") => void;
}) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {},
  });

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>pomoguru</h1>
      <Card withBorder p="md" radius="md">
        <Card.Section>
          <Image
            height={240}
            src="https://images.unsplash.com/photo-1484383707950-89c8d3276e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2229&q=80"
          />
        </Card.Section>
        <Card.Section p="md">
          <Stack>
            <TextInput
              label="Email"
              placeholder="me@email.com"
              type="email"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="********"
              type="password"
              {...form.getInputProps("password")}
            />
            <Center>
              <Group>
                <Button
                  onClick={form.onSubmit(async (values) => {
                    const signInResult = await signIn(
                      values.email,
                      values.password
                    );

                    form.setValues({
                      email: "",
                      password: "",
                    });

                    props.updateAuthStatus(
                      signInResult?.status === 200,
                      "cloud"
                    );
                  })}
                >
                  Sign up
                </Button>
                <Button
                  color="green"
                  onClick={form.onSubmit(async (values) => {
                    const loginResult = await logIn(
                      values.email,
                      values.password
                    );

                    form.setValues({
                      email: "",
                      password: "",
                    });

                    props.updateAuthStatus(
                      loginResult?.status === 200,
                      "cloud"
                    );
                  })}
                >
                  Log in
                </Button>
              </Group>
            </Center>
          </Stack>
        </Card.Section>
        <Card.Section>
          <Center>
            <small>
              <a href="#" onClick={() => props.updateAuthStatus(true, "local")}>
                Or continue offline
              </a>
            </small>
          </Center>
        </Card.Section>
      </Card>
    </div>
  );
};

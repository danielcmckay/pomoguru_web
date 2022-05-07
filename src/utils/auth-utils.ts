import axios from "axios";

export async function signIn(email: string, password: string) {
  try {
    return await axios.post("http://localhost:8000/auth/signup", {
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function logIn(email: string, password: string) {
  try {
    return await axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function signOut(email: string) {
  try {
    return await axios.post("http://localhost:8000/auth/signout", {
      email,
    });
  } catch (err) {
    console.log(err);
  }
}

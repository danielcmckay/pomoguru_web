import axios from "axios";

export async function fetchItems(path: string) {
  try {
    return await (
      await axios.get(path)
    ).data;
  } catch (err) {
    console.log(err);
  }
}

export async function postItem(path: string, data: object) {
  try {
    await axios.post(path, data);
  } catch (err) {
    console.log(err);
  }
}

export async function putItem(path: string, data: object) {
  console.log(data);

  try {
    await axios.put(path, data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteItem(path: string) {
  try {
    await axios.delete(path);
  } catch (err) {
    console.log(err);
  }
}

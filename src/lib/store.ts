import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

export async function saveStore(name: string, value: any) {
  // Create a JSON object with the name and value
  const json = { [name]: value };

  // Serialize the JSON object into a string
  const jsonString = JSON.stringify(json);

  await writeTextFile("settings.json", jsonString, {
    dir: BaseDirectory.AppConfig,
  });
}

export async function getStore(name: string) {
  try {
    // Read the JSON string from the file
    const jsonString = await readTextFile("settings.json", {
      dir: BaseDirectory.AppConfig,
    });

    // Parse the JSON string into an object
    const store = JSON.parse(jsonString);

    // console.log(store[name]);

    // Return the value associated with the name, or undefined if the name is not found
    return store[name];
  } catch (error) {
    // Handle any errors (e.g., file not found, parse errors)
    console.error("Error retrieving the store:", error);
    return undefined;
  }
}

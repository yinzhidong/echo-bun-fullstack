export async function main() {
  console.log(`Hello from hello2.js ctx=${JSON.stringify(ctx)}`);

  try {
    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error('Error:', error);
    return JSON.stringify(error)
  }
}

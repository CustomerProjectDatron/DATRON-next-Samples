const apiUrl = "http://localhost/api/v2"; // Replace with your API endpoint
const tokenEndpoint = `${apiUrl}/User/CreateToken`;
const statusEndpoint = `${apiUrl}/Machine/MachineStatus`;
const statusLightEndpoint = `${apiUrl}/MachineComponents/StatusLight`;

const executeLinesEndpoint = `${apiUrl}/Execution/ExecuteLines`;
const tokenKey = "apiBearerToken";
let pollingInterval;

async function generateToken() {
  const username = prompt("Please enter your username:");
  const password = prompt("Please enter your password:");

  if (!username || !password) {
    alert("Username and password are required!");
    return;
  }

  try {
    clearInterval(pollingInterval); // Stop polling

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) throw new Error("Failed to generate token");

    const data = await response.json();
    localStorage.setItem(tokenKey, data.token);
  } catch (error) {
    console.error("Error generating token:", error);
    alert("Error generating token!");
  } finally {
    startPolling(); // Restart polling
  }
}

async function getToken() {
  let token = localStorage.getItem(tokenKey);

  if (!token) {
    await generateToken();
    token = localStorage.getItem(tokenKey);
  }

  return token;
}

async function fetchStatusLight() {
  try {
    let token = await getToken();

    const response = await fetch(statusLightEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      await generateToken();
      token = localStorage.getItem(tokenKey);
      return fetchStatusLight();
    }

    if (!response.ok) throw new Error("Failed to fetch status light");

    const data = await response.json();
    const intensity = 0.2;
    const backgroundColor = `rgba(${data.red}, ${data.green}, ${data.blue},0.4)`;
    document.getElementById("statusTemplate").style.backgroundColor =
      backgroundColor;
  } catch (error) {
    console.error("Error fetching status light:", error);
  }
}

async function fetchMachineStatus() {
  try {
    let token = await getToken();

    const response = await fetch(statusEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      await generateToken();
      token = localStorage.getItem(tokenKey);
      return fetchStatus();
    }

    if (!response.ok) throw new Error("Failed to fetch status");

    const data = await response.json();
    document.getElementById("machineStatus").textContent = data.executionState;

    // Fetch and update background color based on status light
  } catch (error) {
    console.error("Error fetching machine status:", error);
  }
}

async function updateMachineStatus() {
  await fetchMachineStatus();
  await fetchStatusLight();
}

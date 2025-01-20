const stringVariableEndpoint = `${apiUrl}/Variable/StringVariable`;

async function setStringVariable() {
  const variableName = document.getElementById("setVariableName").value;
  const variableValue = document.getElementById("setVariableValue").value;

  if (!variableName || !variableValue) {
    alert("Please enter both variable name and value.");
    return;
  }

  const token = await getToken();

  try {
    const response = await fetch(stringVariableEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: variableName, value: variableValue }),
    });

    if (response.ok) {
      document.getElementById("setResult").innerText =
        "Variable set successfully";
    } else {
      document.getElementById("setResult").innerText = "Error setting variable";
    }
  } catch (error) {
    document.getElementById("setResult").innerText = "Error setting variable";
  }
}

async function getStringVariable() {
  try {
    const variableName = document.getElementById("getVariableName").value;

    if (!variableName) {
      alert("Please enter a variable name.");
      return;
    }

    let token = await getToken();

    const response = await fetch(
      `${stringVariableEndpoint}?name=${variableName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      await generateToken();
      token = localStorage.getItem(tokenKey);
      return fetchStringVariable();
    }

    if (!response.ok) throw new Error("Failed to get string variable");

    const data = await response.json();
    document.getElementById("getVariableValue").textContent = data.value || "N/A";
  } catch (error) {
    console.error("Error get string variable:", error);
    alert("Error get string variable!");
  }
}

document
  .getElementById("getVariable")
  .addEventListener("click", getStringVariable);

document
  .getElementById("setVariable")
  .addEventListener("click", setStringVariable);

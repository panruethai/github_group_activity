// Public API URL
const url = "https://jsonplaceholder.typicode.com/users";

// Select HTML elements
const loadButton = document.querySelector("#loadButton");
const message = document.querySelector("#message");
const userList = document.querySelector("#users");


// Function to load users from the API
const loadUsers = async () => {

  // Show loading message
  message.textContent = "Loading users...";

  // Clear previous user data
  userList.innerHTML = "";

  try {

    // Send request to the API
    const response = await fetch(url);

    // Check whether the request was successful
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Convert JSON response to JavaScript data
    const users = await response.json();

    // Display users
    userList.innerHTML = users
      .map(user => {

        return `
          <li class="user-card">

            <h3>${user.name}</h3>

            <p>
              <strong>Email:</strong>
              ${user.email}
            </p>

            <p>
              <strong>Phone:</strong>
              ${user.phone}
            </p>

            <p>
              <strong>Website:</strong>
              ${user.website}
            </p>

            <p>
              <strong>City:</strong>
              ${user.address.city}
            </p>

          </li>
        `;

      })
      .join("");

    // Success message
    message.textContent =
      `${users.length} users loaded successfully.`;

  } catch (error) {

    console.error(error);

    // Friendly error message
    message.textContent =
      "Sorry, the user information could not be loaded.";

  }

};


// Start loading users when the button is clicked
loadButton.addEventListener("click", loadUsers);
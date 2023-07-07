const url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const tData = document.querySelector("tbody");
const searchBox = document.querySelector("#search-box");
const infoContent = document.querySelector("#info-content");

let usersData = []; // Variable to store all the user data

async function fetchUserData() {
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      usersData = data;
      displayUserData(data);
    });
}
fetchUserData();

const showDescription = (rr) => {
  infoContent.style.display = "block";
  infoContent.innerHTML = `
    <div><b>User selected:</b> ${rr.firstName} ${rr.lastName}</div>
    <div>
      <b>Description: </b>
      <textarea cols="50" rows="5" readonly>${rr.description}</textarea>
    </div>
    <div><b>Address:</b> ${rr.address?.streetAddress}</div> <!-- Updated line -->
    <div><b>City:</b> ${rr.address.city}</div> <!-- Updated line -->
    <div><b>State:</b> ${rr.address.state}</div> <!-- Updated line -->
    <div><b>Zip:</b> ${rr.address.zip}</div> <!-- Updated line -->
  `;
};

function displayUserData(data) {
  data.map((user) => {
    let row = document.createElement("tr");
    row.classList.add("data-row");
    row.innerHTML = `
      <td class="column1">${user.id}</td>
      <td class="column2">${user.firstName}</td>
      <td class="column3">${user.lastName}</td>
      <td class="column4">${user.email}</td>
      <td class="column5">${user.phone}</td>
    `;
    tData.appendChild(row);
    row.addEventListener("click", () => {
      let rows = document.querySelectorAll(".data-row");
      rows.forEach((row) => {
        row.classList.remove("active");
      });

      // Add 'active' class to the clicked row
      row.classList.add("active");

      // Call showDescription function
      showDescription(user);
    });
  });
}

function filterData(searchTerm) {
  const filteredData = usersData.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  displayUserData(filteredData);
}

searchBox.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  filterData(searchTerm);
});

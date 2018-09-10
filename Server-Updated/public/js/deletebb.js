document.querySelector(".delete-bb-button").addEventListener("click", removebb);

// Function to remove student
function removebb(e) {
  //const id = e.target.getAttribute("data-id");
  if (confirm("Are you sure you want to delete")) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/abs/delete`, true);
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText).message);
      window.location.href = "/library";
    };
    xhr.send();
  }
}

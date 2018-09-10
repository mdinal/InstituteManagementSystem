// Delete books method
document
  .querySelector(".delete-book-button")
  .addEventListener("click", removebook);

// Function to book student
function removebook(e) {
  const id = e.target.getAttribute("data-id");
  if (confirm("Are you sure you want to delete")) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/library/${id}`, true);
    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText).message);
      window.location.href = "/library";
    };
    xhr.send();
  }
}

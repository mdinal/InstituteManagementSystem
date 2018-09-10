document.querySelector("#student-id-field").addEventListener("keyup", e => {
  let id = e.target.value;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/library/check/" + id);
  xhr.onload = () => {
    let count = JSON.parse(xhr.responseText).count;
    document.querySelector(
      "#mymessage01"
    ).innerHTML = `<p> ${count} books has borrowed this Student </p>`;
  };
  xhr.send();
});

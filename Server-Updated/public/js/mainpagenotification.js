function load() {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "/library/load/my", true);
  xhr.onload = () => {
    console.log(999);
    let msg = JSON.parse(xhr.responseText);
    let output = "";
    msg.msg.forEach(m => {
      output += m.book_id + " has not been returned.<br>";
    });
    console.log(msg);
    document.querySelector("#mymessage").innerHTML = `<p>${output}</p>`;
  };
  xhr.send();
}
load();

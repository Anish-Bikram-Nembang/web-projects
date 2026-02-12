"use strict";
let list = document.getElementsByTagName("li");
var i;
for (i = 0; i < list.length; i++) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  list[i].appendChild(span);
}
const textInput = document.getElementById("input");
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    newElement();
  }
});
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

function newElement() {
  var li = document.createElement("li");
  li.className = "todo";
  var input = document.getElementById("input").value;
  var text = document.createTextNode(input);
  li.appendChild(text);
  input === ""
    ? alert("You must write something! :/(")
    : document.getElementById("UL").appendChild(li);
  document.getElementById("input").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

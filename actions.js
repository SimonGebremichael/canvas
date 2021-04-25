var colors = ["lightgreen", "lightblue", "pink", "white", "yellow"];
var c = 0;
var rate = 200;
var removing = false;
var mode = "draw";
var toolType = "click";
var animate = [];

var b = [];
for (var i = 1; i <= 1000; i++) {
  b.push(false);
  var btn = document.createElement("button");
  btn.id = i;
  btn.className = "box";
  btn.style.animation = "slideInLeft 0." + i + "s";
  document.getElementById("display").appendChild(btn);
}
var box = document.getElementsByClassName("box");

document.getElementById("display").addEventListener("click", () => {
  if (removing == false) {
    rate = 50;
    changeColor();
  }
});
document.getElementById("display").addEventListener("contextmenu", () => {
  clear(false);
});

document.getElementById("switch").addEventListener("change", (data) => {
  start(data.target.value);
});
start(document.getElementById("switch").value);
function start(data) {
  clear(true);
  mode = data;
  if (mode == "boxes") {
    toolType = "click";
    boxes();
  } else if (mode == "draw") {
    draw();
  } else if (mode == "brush") {
    toolType = "mouseover";
    boxes();
  }
}

function draw() {
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("mouseover", function (data) {
      if (mode == "draw") {
        var pos = parseInt(data.target.id);
        if (b[pos] == false || data.target.style.backgroundColor == "#222") {
          b[pos] = true;
          b[pos + 49] = true;
          data.target.style.width = "1%";
          data.target.style.backgroundColor = colors[c];
          data.target.style.width = "100%";
          setTimeout(() => {
            if (box[pos + 49] != undefined) {
              box[pos + 49].style.width = "1%";
              box[pos + 49].style.backgroundColor = "#222";
              box[pos + 49].style.width = "100%";
            }
          }, 500);
        }
      }
    });
  }
}

function boxes() {
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener(toolType, function (data) {
      if (mode == "boxes" || mode == "brush") {
        if (mode == "brush") {
          changeColor();
        }
        var pos = parseInt(data.target.id);
        var rand = 3;
        mode == "boxes"
          ? (rand = Math.floor(Math.random() * 5) + 4)
          : (rand = Math.floor(Math.random() * 1) + 2);
        var count = 0;
        var count2 = 0;
        var count3 = 0;
        var skip = 50;
        animate.push(setInterval(populate, rate));
        function populate() {
          if (count <= rand - 2) {
            change(pos + count, pos + count + skip);
            change(pos - count, pos - count + skip);
            change(pos - skip * count - 1, null);
            change(pos + skip * count - 1, null);
            count++;
          } else if (count2 <= rand - 2) {
            count2++;
            change(pos + count - 1 + count2 * skip, null);
            change(pos + count - 1 - count2 * skip, null);
            change(pos - count + 1 - count2 * skip, null);
            change(pos - count + 1 + count2 * skip, null);
          } else if (count3 <= rand * 2 - 4) {
            count3++;
            var pos2 = pos - count - (rand - 2) * skip + count3;
            try {
              if (box[pos2].style.backgroundColor != colors[c]) {
                change(pos - count - count2 * skip + count3, pos2);
              } else {
                change(pos - count - count2 * skip + count3, null);
              }
            } catch (e) {}
            change(
              pos - count + count2 * skip + count3,
              pos - count + rand * skip + count3
            );
          }
        }
      }
    });
  }
}

function change(button, shadow) {
  try {
    box[button].style.backgroundColor = colors[c];
    box[button].style.width = "100%";

    if (shadow != null && mode == "boxes") {
      box[shadow].style.backgroundColor = "#333";
      box[shadow].style.width = "100%";
    }
  } catch (e) {}
}

function changeColor() {
  var f = false;
  while (!f) {
    var temp = Math.floor(Math.random() * 5);
    if (temp != c) {
      c = temp;
      f = true;
    }
  }
}

function clear(resetListeners) {
  if (!removing) {
    removing = true;
    animate.forEach((e) => {
      clearInterval(e);
    });
    animate = [];
    for (var i = 1; i <= 1000; i++) {
      box[i - 1].style.backgroundColor = "black";
      b[i - 1] = false;
      if (resetListeners) {
        box[i - 1].replaceWith(box[i - 1].cloneNode(true));
      }
    }
    removing = false;
  }
}

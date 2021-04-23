var colors = ["lightgreen", "lightblue", "pink", "white", "yellow"];
var c = 0;
var rate = 200;
var removing = false;
var mode = "draw";
var animate = [];

var b = [];
for (var i = 1; i <= 1000; i++) {
  b.push(false);
  var btn = document.createElement("button");
  btn.id = i;
  btn.className = "box";
  document.getElementById("display").appendChild(btn);
}
var box = document.getElementsByClassName("box");

document.getElementById("display").addEventListener("click", () => {
  if (removing == false) {
    rate = 50;
    var f = false;
    while (!f) {
      var temp = Math.floor(Math.random() * 5);
      if (temp != c) {
        c = temp;
        f = true;
      }
    }
  }
});
document.getElementById("display").addEventListener("contextmenu", clear);

document.getElementById("switch").addEventListener("change", function (data) {
  clear();
  mode = data.target.value;
  if (mode == "boxes") {
    boxes();
  } else {
    draw();
  }
});

draw();
function draw() {
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("mouseover", function (data) {
      if (mode == "draw") {
        var pos = parseInt(data.target.id);
        if (b[pos] == false || data.target.style.backgroundColor == "#222") {
          b[pos] = true;
          b[pos + 49] = true;
          data.target.style.backgroundColor = colors[c];
          setTimeout(() => {
            if (box[pos + 49] != undefined) {
              box[pos + 49].style.backgroundColor = "#222";
            }
          }, 500);
        }
      }
    });
  }
}

function boxes() {
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener("click", function (data) {
      if (mode == "boxes") {
        var pos = parseInt(data.target.id);
        var rand = Math.floor(Math.random() * 5) + 4;
        var count = 0;
        var count2 = 0;
        var count3 = 0;
        animate.push(setInterval(populate, rate));
        function populate() {
          if (count <= rand - 2) {
            try {
              box[pos + count].style.backgroundColor = colors[c];
              box[pos + count + 50].style.backgroundColor = "#333";
            } catch (e) {}
            try {
              box[pos - count].style.backgroundColor = colors[c];
              box[pos - count + 50].style.backgroundColor = "#333";
            } catch (e) {}
            try {
              box[pos - 50 * count - 1].style.backgroundColor = colors[c];
            } catch (e) {}
            try {
              box[pos + 50 * count - 1].style.backgroundColor = colors[c];
            } catch (e) {}
            count++;
          } else if (count2 <= rand - 2) {
            count2++;
            try {
              box[pos + count - 1 + count2 * 50].style.backgroundColor =
                colors[c];
            } catch (e) {}

            try {
              box[pos + count - 1 - count2 * 50].style.backgroundColor =
                colors[c];
            } catch (e) {}

            try {
              box[pos - count + 1 - count2 * 50].style.backgroundColor =
                colors[c];
            } catch (e) {}

            try {
              box[pos - count + 1 + count2 * 50].style.backgroundColor =
                colors[c];
            } catch (e) {}
          } else if (count3 <= rand * 2 - 4) {
            count3++;
            try {
              box[pos - count - count2 * 50 + count3].style.backgroundColor =
                colors[c];
              if (
                box[pos - count - (rand - 2) * 50 + count3].style
                  .backgroundColor != colors[c]
              ) {
                box[
                  pos - count - (rand - 2) * 50 + count3
                ].style.backgroundColor = "#333";
              }
            } catch (e) {}
            try {
              box[pos - count + count2 * 50 + count3].style.backgroundColor =
                colors[c];
              box[pos - count + rand * 50 + count3].style.backgroundColor =
                "#333";
            } catch (e) {}
          }
        }
      }
    });
  }
}

function clear() {
  if (!removing) {
    removing = true;
    animate.forEach((e) => {
      clearInterval(e);
    });
    animate = [];
    for (var i = 1; i <= 1000; i++) {
      box[i - 1].style.backgroundColor = "black";
      b[i - 1] = false;
    }
    removing = false;
  }
}

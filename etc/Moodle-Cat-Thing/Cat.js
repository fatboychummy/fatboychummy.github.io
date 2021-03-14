// Declarashuns
var possibleParents = document.getElementsByClassName(" block_html block  card mb-3");
var up;
for (i = 0; i < possibleParents.length; i++) {
  if (possibleParents[i].contains(document.currentScript)) {
    up = possibleParents[i];
    break;
  }
}

// One liner function:
const addCSS = s => document.head.appendChild(document.createElement("style")).innerHTML=s;

// Usage: 
addCSS("#FAT_IMAGE{display:block !important; margin-left:auto !important; margin-right:auto !important; -webkit-box-shadow: 0 10px 6px -6px #777; -moz-box-shadow: 0 10px 6px -6px #777; box-shadow: 0 10px 6px -6px #777; !important;}")
  
// get the FAT_IMAGE
var img = document.getElementById("FAT_IMAGE");

// Resize the image (using a very simple pattern tbh) whenever the screen resizes.
function ResizePicture() {
  for (i = 0; i < up.children.length; i++) {
    if (up.children[i].nodeName === "DIV") {
      img.width = up.children[i].clientWidth - 125;
      break;
    }
  }
}

// Get stuff
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Get the catto
ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
  img.src = data[0]["url"];
});

// Resize as soon as it loads.
ResizePicture();

// Register resize callback
window.onresize = ResizePicture;

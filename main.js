function save() {
    var fileName = prompt("Enter a name for your document.");
    var download = document.createElement('a');
    download.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(document.getElementById("text").value.replaceAll("\n", "<br>")));
    download.setAttribute('download', fileName + ".html");

    download.style.display = 'none';
    document.body.appendChild(download);

    download.click();

    document.body.removeChild(download);
}
let output = document.getElementById('output');
let textarea = document.querySelector('textarea');
function evalate() {
    //var lines = textarea.value.replace("Microsoft", "W3Schools");
    var lines = textarea.value.split("\n");
    var result = [];
    var i = 0;
    while (i < lines.length ) {
        if (lines[i].indexOf("+") != -1 || lines[i].indexOf("-") != -1 || lines[i].indexOf("*") != -1 || lines[i].indexOf("/") != -1 && lines[lines[i].indexOf("/")-1] == "<") {
            result.push(eval(lines[i]));
        }
        else {result.push(lines[i]);}
        i++;
    }
    console.log(result.toString("\n"));
    return result.join("\n").replaceAll("\n", "<br>");  
}
var data = evalate();
output.innerHTML = data;
textarea.addEventListener('input', function(){
    var data = evalate();
    console.log(data);
    output.innerHTML = data;
});
function loadFile() {
let input = document.querySelector('input');
input.addEventListener('change', () => {
    let files = input.files;
    if (files.length == 0) return;
    const file = files[0];
  
    let reader = new FileReader();
  
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split("<br>");
        textarea.value = lines.join('\n');
  
    };
  
    reader.onerror = (e) => alert(e.target.error.name);
  
    reader.readAsText(file);
});
}
function upload() {
	var upload = document.createElement('input');
	upload.setAttribute('type', 'file');
	upload.style.display = 'none';
	document.body.appendChild(upload);
	upload.click();
	loadFile();
	document.body.removeChild(upload);
}

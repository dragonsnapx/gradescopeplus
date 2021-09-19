
export function downloadFileFromText(filename, content) {
  const a = document.createElement('a');
  const blob = new Blob([ content ], {type : "text/plain;charset=UTF-8"});
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click(); //this is probably the key - simulating a click on a download link
}
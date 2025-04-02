let docBody = document.querySelector('body');

let upFile = document.querySelector('button#csv-upload');
if (upFile === null) {
    upFile = document.createElement('button');
    upFile.setAttribute('id', 'csv-upload');
    upFile.setAttribute('accept', '.csv');
    upFile.parentElement = docBody;
}
console.log(upFile);
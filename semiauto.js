let docBody = document.querySelector('body');
let btnRow = document.querySelector('div.pagehead-actions.app-links');

let upBegin = document.querySelector('button#csv-begin');
if (upBegin === null) {
    upBegin = document.createElement('button');
    upBegin.setAttribute('id', 'csv-upload');
    upBegin.innerText = 'BEGIN';
    btnRow.appendChild(upBegin);
}

let upFile = document.querySelector('input#csv-upload');
if (upFile === null) {
    upFile = document.createElement('input');
    upFile.setAttribute('type', 'file');
    upFile.setAttribute('id', 'csv-upload');
    upFile.setAttribute('accept', '.csv');
    upFile.innerText = 'CSV FILE';
    btnRow.appendChild(upFile);
}
console.log(upFile);
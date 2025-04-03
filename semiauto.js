let docBody = document.querySelector('body');
let btnRow = document.querySelector('div.pagehead-actions.app-links');

function tu32(num) {
	let ret = '';
	for (let i = 3; i >= 0; i--) {
		ret += String.fromCharCode((num >> (8*i)) & 255);
	}
	return ret;
}

function fu32(chr) {
	let num = 0;
	for (let i = 3; i >= 0; i--) {
		num += chr.charCodeAt(3-i) << (8*i);
	}
	return num;
}

function collectSingleGame() {
	let id = window.location.href.slice(25,-1).split('/')[0];
	let appName = document.querySelector('h1[itemprop=\"name\"]').innerText;
	let developer = document.querySelector('a[itemprop=\"author\"]').innerText;
	let publisher = document.querySelector('a[itemprop=\"publisher\"]').innerText;
	let releaseDate = document.querySelector('relative-time[itemprop=\"datePublished\"]').getAttribute('content');

	let usdParent = document.querySelector('td[data-cc=\"us\"]').parentElement;
	let usdPrice = usdParent.children[1].innerText.slice(1);

	let brlParent = document.querySelector('td[data-cc=\"br\"]').parentElement;
	let brlPrice = brlParent.children[1].innerText.slice(3).replaceAll(',','.');
	let brlLowest = brlParent.children[3].innerText.slice(3).replaceAll(',','.');

	let chartsParent = document.querySelector('ul.app-chart-numbers');
	let positiveReview = 'NaN';
	let negativeReview = 'NaN';
	let topSeller = 'NaN';
	let viewed = new Date().toISOString().slice(0,10);

	if (chartsParent.children.length === 5) {
		topSeller = chartsParent.children[1].children[0].innerText.slice(1);
		positiveReview = chartsParent.children[2].children[0].innerText.replaceAll(',','');
		negativeReview = chartsParent.children[3].children[0].innerText.replaceAll(',','');
	} else {
		positiveReview = chartsParent.children[1].children[0].innerText.replaceAll(',','');
		negativeReview = chartsParent.children[2].children[0].innerText.replaceAll(',','');
	}

	let output = id;
	output += `\t${appName}`;
	output += `\t${developer}`;
	output += `\t${publisher}`;
	output += `\t${releaseDate}`;
	output += `\t${usdPrice}`;
	output += `\t${brlPrice}`;
	output += `\t${brlLowest}`;
	output += `\t${positiveReview}`;
	output += `\t${negativeReview}`;
	output += `\t${topSeller}`;
	output += `\t${viewed}`;

	localStorage.setItem('steamdb-pack', `${localStorage.getItem('steamdb-pack')}${output}\n`);
	console.log(output);
}

function collectData() {
	let output = '';
	let pos = localStorage.getItem('steamdb-pos');
	let games = localStorage.getItem('steamdb-csv');
	let count = Math.ceil(games.length/4);
	for (let i = 0; i < count; i++) {
		let num = fu32(games.slice(i*4, (i+1)*4));
		console.log(num);
		let win = window.open(`https://steamdb.info/app/${num}`);
		win.addEventListener('load', () => {
			let script = document.createElement('script');
			script.setAttribute('defer', 'defer');
			script.setAttribute('src', 'icdsteamdb.js');
			win.document.head.appendChild(script);
			collectSingleGame();
		});
	}
}

let upBegin = document.querySelector('button#csv-begin');
if (upBegin === null) {
	upBegin = document.createElement('button');
	upBegin.setAttribute('id', 'csv-upload');
	upBegin.innerText = 'BEGIN';
	upBegin.onclick = () => {
		let f = upFile.files[0];
		localStorage.removeItem('steamdb-pack');
		localStorage.setItem('steamdb-pos', 0);
		if (f !== undefined) {
			let reader = new FileReader();
			reader.readAsText(f, 'UTF-8');
			reader.onload = (evt) => {
				let bin = '';
				let rows = evt.target.result.split('\n');
				console.log(`Reading ${rows.length-1} rows`);
				for (let i = 1; i < rows.length-1; i++) {
					let chr = rows[i].split(';')[0];
					let num = parseInt(chr);
					bin += tu32(num);
				}
				console.log(bin);
				localStorage.setItem('steamdb-csv', bin);
				alert('Successfully updated CSV file.');
				collectData();
			}
			reader.onerror = (evt) => {
				error('Could not open CSV file.');
			}
		}
	}
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
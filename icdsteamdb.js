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
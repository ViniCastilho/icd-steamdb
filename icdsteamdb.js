// if (window.location.href.includes('charts')) {
//     window.location.href = window.location.href.slice(0,-7);
// }

let id = window.location.href.slice(25,-1).split('/')[0];
let appName = document.querySelector('h1[itemprop=\"name\"]').innerText;
let developer = document.querySelector('a[itemprop=\"author\"]').innerText;
let publisher = document.querySelector('a[itemprop=\"publisher\"]').innerText;
let releaseDate = document.querySelector('relative-time[itemprop=\"datePublished\"]').getAttribute('content');

let usdParent = document.querySelector('td[data-cc=\"us\"]').parentElement;
let usdPrice = usdParent.children[1].innerText.slice(1);

let brlParent = document.querySelector('td[data-cc=\"br\"]').parentElement;
let brlPrice = brlParent.children[1].innerText.slice(3).replace(',','.');
let brlLowest = brlParent.children[3].innerText.slice(3).replace(',','.');

// localStorage.setItem(`${id}/APP ID`, id);
// localStorage.setItem(`${id}/NAME`, appName);
// localStorage.setItem(`${id}/DEVELOPER`, developer);
// localStorage.setItem(`${id}/PUBLISHER`, publisher);
// localStorage.setItem(`${id}/RELEASE DATE`, releaseDate);
// localStorage.setItem(`${id}/USD PRICE`, usdPrice);
// localStorage.setItem(`${id}/BRL PRICE`, brlPrice);
// localStorage.setItem(`${id}/LOWEST BRL PRICE`, brlLowest);

// if (!window.location.href.includes('charts')) {
//     window.location.href += 'charts/';
// }

let chartsParent = document.querySelector('ul.app-chart-numbers');
let positiveReview = 'NaN';
let negativeReview = 'NaN';
let topSeller = 'NaN';
let viewed = new Date().toISOString().slice(0,10);

if (chartsParent.children.length === 5) {
    topSeller = chartsParent.children[1].children[0].innerText.slice(1);
    positiveReview = chartsParent.children[2].children[0].innerText.replace(',','');
    negativeReview = chartsParent.children[3].children[0].innerText.replace(',','');
} else {
    positiveReview = chartsParent.children[1].children[0].innerText.replace(',','');
    negativeReview = chartsParent.children[2].children[0].innerText.replace(',','');
}

// localStorage.setItem(`${id}/POSITIVE REVIEWS`, id);
// localStorage.setItem(`${id}/NEGATIVE REVIEWS`, appName);
// localStorage.setItem(`${id}/TOP SELLER`, developer);
// localStorage.setItem(`${id}/VIEWED ON`, publisher);

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

localStorage.setItem(`steamdb.${id}`, output);
console.log(output);
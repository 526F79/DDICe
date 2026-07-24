import { parse } from "https://cdn.jsdelivr.net/npm/@vanillaes/csv/src/index.min.js";

function increaseCardHeight(card) {
    var main = card.getElementsByClassName('card-main')[0];
    var text = card.getElementsByClassName('card-text')[0];
    if (!main || !text) {
        console.error(`Card does not have a main or text div!`);
        return;
    }
    card.style.setProperty('--card-height', '3.5in');
    card.style.gridRowEnd = 'span 1';
    var mainY = main.getBoundingClientRect().bottom;
    var textY = text.getBoundingClientRect().bottom;

    if(mainY < textY) {
        card.style.setProperty('--card-height', '7in');
        card.style.gridRowEnd = 'span 2';
    }
}

function increaseCardHeights() {
    var cards = document.getElementsByClassName('card');
    if (!cards) {
        console.error('No cards where found!');
        return;
    }
    for (let i = 0; i < cards.length; i++) {
        increaseCardHeight(cards[i]);
    }
}

window.addEventListener('load', increaseCardHeights);


var header;

function getColumnIndex(column) {
    for (let i = 0; i < header.length; i++) {
        if (header[i] == column) return i;
    }
    console.warn(`Column '${column}' does not exist!`);
}

function getColumn(data, column) {
    const value = data[getColumnIndex(column)];
    if (!value) return "";
    return value;
}

function getName(data) { return getColumn(data, "Name"); }
function getRarity(data) { return getColumn(data, "Rarity"); }
function getType(data) { return getColumn(data, "Type"); }
function getAttunement(data) { return getColumn(data, "Attunement"); }
function getDamage(data) { return getColumn(data, "Damage"); }
function getProperties(data) { return getColumn(data, "Properties"); }
function getMastery(data) { return getColumn(data, "Mastery"); }
function getOther(data) { return getColumn(data, "Other"); }
function getWeight(data) { return getColumn(data, "Weight"); }
function getValue(data) { return getColumn(data, "Value"); }
function getText(data) { return getColumn(data, "Text"); }
function getImage(data) { return getColumn(data, "Image-url"); }
function getScale(data) { return getColumn(data, "Image-Scale"); }
function getRotation(data) { return getColumn(data, "Image-Rotation"); }

function addCard(parrent, data) {
    const template = document.getElementById('card-template');
    const card = template.content.firstElementChild.cloneNode(true);

    // Name
    card.querySelector('.card-head').textContent = getName(data);

    // Image
    const imageDiv = card.querySelector('.card-img');
    const image = getImage(data);
    if(image == "") imageDiv.remove();
    else {
        imageDiv.querySelector('img:last-child').src = image;
        const scale = getScale(data);
        if(scale == "") scale = "1";
        imageDiv.querySelector('img:last-child').style.setProperty('--scale', scale);
        const rotation = getRotation(data);
        if(rotation == "") rotation = "0deg";
        imageDiv.querySelector('img:last-child').style.setProperty('--rotate', rotation);
    }

    // Stats
    const statDiv = card.querySelector('.card-stat');
    const damage = getDamage(data);
    if(damage != "") {
        const damageDiv = document.createElement('div');
        damageDiv.innerHTML = damage;
        statDiv.appendChild(damageDiv);
    }
    const mastery = getMastery(data);
    if(mastery != "") {
        const masteryDiv = document.createElement('div');
        masteryDiv.innerHTML = mastery;
        statDiv.appendChild(masteryDiv);
    }
    const attunement = getAttunement(data);
    if(attunement != "") {
        const attunementDiv = document.createElement('div');
        attunementDiv.innerHTML = attunement;
        statDiv.appendChild(attunementDiv);
    }
    const properties = getProperties(data);
    if(properties != "") {
        const propertiesDiv = document.createElement('div');
        propertiesDiv.innerHTML = properties;
        statDiv.appendChild(propertiesDiv);
    }
    const other = getOther(data);
    if(other != "") {
        const otherDiv = document.createElement('div');
        otherDiv.innerHTML = other;
        statDiv.appendChild(otherDiv);
    }
    if(statDiv.children.length <= 0) statDiv.remove();

    // Text
    card.querySelector('.card-text').innerHTML = getText(data);

    // Type
    const typeDiv = card.querySelector('.card-type');
    const type = getType(data);
    if (type != "") typeDiv.textContent = type;
    else typeDiv.remove();

    // Rarity
    const rarityDiv = card.querySelector('.card-rarity');
    const rarity = getRarity(data);
    if(rarity != "") {
        rarityDiv.textContent = rarity;
        rarityDiv.classList.add(rarity);
    } else rarityDiv.remove();

    // Value
    const valueDiv = card.querySelector('.card-value');
    const value = getValue(data);
    if (value != "") valueDiv.textContent = value;
    else valueDiv.remove();

    // Weight
    const weightDiv = card.querySelector('.card-weight');
    const weight = getWeight(data);
    if (weight != "") weightDiv.textContent = weight;
    else weightDiv.remove();

    parrent.appendChild(card);

    increaseCardHeights(card);
}

document.getElementById("csv-file").addEventListener("change", async (e) => {
    const input = e.target.files[0];
    const reader = new FileReader();
    const cards = document.getElementById('cards');
    reader.addEventListener("load", () => {
        const data = parse(String(reader.result));
        header = data[0];
        for (let i = 1; i < data.length; i++) {
           addCard(cards, data[i]);
        }
    });
    if (!input) {
        console.log('Input file is null!');
        return;
    }
    cards.innerHTML = "";
    reader.readAsText(input);
});
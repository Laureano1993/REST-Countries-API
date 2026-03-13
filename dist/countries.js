var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const filter = document.querySelector(".filter");
const inputCountry = document.querySelector("#input-country");
const selectRegion = document.querySelector("#select-region");
const list = document.querySelector(".list");
/*DETAILS*/
const detailsDiv = document.querySelector(".details");
const btnBack = document.querySelector(".btn-back");
const countryDiv = document.querySelector(".country");
let countries = [];
const getCountries = (jsonFile) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield fetch(jsonFile);
        const data = yield res.json();
        countries = data;
        showCountries(countries);
    }
    catch (err) {
        console.log(err);
    }
});
const showCountries = (countries) => {
    list.innerHTML = "";
    countries.forEach(country => {
        list.insertAdjacentHTML("beforeend", `
            <div class="card">
                <div class="card__img">
                    <img src="${country.flags.png}" />
                </div>
                <div class="card__info">
                    <h4 class="name">${country.name}</h4>
                    <p class="info"><b>Population:</b> ${country.population.toLocaleString()}</p>
                    <p class="info"><b>Region:</b> ${country.region}</p>
                    <p class="info"><b>Capital:</b> ${country.capital}</p>
                </div>
            </div>    
        `);
    });
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            const cardCountry = e.target.parentElement.parentElement.children[1].firstElementChild.textContent;
            const countrySelected = countries.filter(country => country.name === cardCountry);
            showDetails(countrySelected);
        });
    });
};
const filterCountries = () => {
    const inputValue = inputCountry.value.trim().toLowerCase();
    const optionRegion = selectRegion.value;
    if (inputValue != "" && optionRegion != "") {
        const filterCountries = countries.filter(country => country.name.toLowerCase().includes(inputValue) && country.region === optionRegion);
        showCountries(filterCountries);
    }
    else if (inputValue != "") {
        const filterCountries = countries.filter(country => country.name.toLowerCase().includes(inputValue));
        showCountries(filterCountries);
    }
    else if (optionRegion != "") {
        const filterCountries = countries.filter(country => country.region === optionRegion);
        showCountries(filterCountries);
    }
    else {
        showCountries(countries);
    }
};
const showDetails = (country) => {
    var _a, _b, _c, _d;
    countryDiv.innerHTML = "";
    filter.style.display = "none";
    list.style.display = "none";
    detailsDiv.style.display = "block";
    countryDiv.insertAdjacentHTML("beforeend", `
        <div class="country__flag">
            <img src="${country[0].flags.svg}" />
        </div>

        <div class="country__info">
                    <div class="country__info__name">
                        <h1 class="country-name">${country[0].name}</h1>
                    </div>

                    <div class="country__info__info">
                        <div class="country-info1">
                            <p class="country-native"><b>Native Name: </b>${country[0].nativeName}</p>
                            <p class="country-population"><b>Population: </b>${country[0].population.toLocaleString()}</p>
                            <p class="country-region"><b>Region: </b>${country[0].region}</p>
                            <p class="country-subregion"><b>Sub Region: </b>${country[0].subregion}</p>
                            <p class="country-capital"><b>Capital: </b>${country[0].capital}</p>
                        </div>

                        <div class="country-info2">
                            <p class="country-domain"><b>Domain: </b>${((_a = country[0].topLevelDomain) === null || _a === void 0 ? void 0 : _a.map(i => " " + i)) || "No Domains"}</p>
                            <p class="country-currencies"><b>Currencies: </b>${((_b = country[0].currencies) === null || _b === void 0 ? void 0 : _b.map(i => " " + i.name)) || "No currencies"}</p>
                            <p class="country-languages"><b>Languages: </b>${((_c = country[0].languages) === null || _c === void 0 ? void 0 : _c.map(i => " " + i.name)) || "No languages"}</p>
                        </div>
                    </div>

                    <div class="country__info__borders">
                        <h4>Border Countries:</h4>
                        <div class="borders">
                            ${((_d = country[0].borders) === null || _d === void 0 ? void 0 : _d.map(i => `<button class="btn-border">${getName(i)}</button>`).join("")) || "<p>No borders</p>"}
                        </div>
                    </div>
        </div>
    `);
    const buttonsBorder = document.querySelectorAll(".btn-border");
    buttonsBorder.forEach(btn => {
        const btnText = btn.textContent;
        const findCountry = countries.filter(country => country.name === btnText);
        btn.addEventListener("click", () => {
            showDetails(findCountry);
        });
    });
};
const closeDetails = () => {
    filter.style.display =
        list.style.display = "flex";
    detailsDiv.style.display = "none";
};
const getName = (code) => {
    const findCountry = countries.filter(country => country.alpha3Code === code);
    return findCountry[0].name;
};
inputCountry.addEventListener("keyup", filterCountries);
selectRegion.addEventListener("change", filterCountries);
btnBack.addEventListener("click", closeDetails);
getCountries("./data.json");

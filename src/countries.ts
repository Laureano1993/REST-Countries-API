interface Flag {
    svg?: string,
    png: string
}

interface Currrency {
    name: string
}

interface Language {
    name: string
}

interface Country {
    name: string,
    nativeName: string,
    flags: Flag,
    population: number,
    region: string,
    subregion: string,
    capital: string,
    topLevelDomain: string[],
    currencies: Currrency[],
    languages: Language[],
    borders: string[]
    alpha3Code: string
}

const filter = document.querySelector(".filter") as HTMLDivElement;
const inputCountry = document.querySelector("#input-country") as HTMLInputElement;
const selectRegion = document.querySelector("#select-region") as HTMLSelectElement;
const list = document.querySelector(".list") as HTMLDivElement;

/*DETAILS*/
const detailsDiv = document.querySelector(".details") as HTMLDivElement;
const btnBack = document.querySelector(".btn-back") as HTMLButtonElement;
const countryDiv = document.querySelector(".country") as HTMLDivElement;

let countries: Country[] = [];

const getCountries = async (jsonFile: string) => {
    try{
        const res = await fetch(jsonFile);
        const data: Country[] = await res.json();
        countries = data;
        showCountries(countries);
        
    }catch(err){
        console.log(err)
    }
}

const showCountries = (countries: Country[]) => {
    list.innerHTML = ""
    countries.forEach(country => {
        list.insertAdjacentHTML("beforeend",`
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
        `)
    })
    
    const cards = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>;
    cards.forEach(card => {
        card.addEventListener("click",(e: Event)=> {
            const cardCountry = e.target.parentElement.parentElement.children[1].firstElementChild.textContent;
            const countrySelected = countries.filter(country => country.name === cardCountry)
            showDetails(countrySelected)
            
        })
    })
}

const filterCountries = () => {
    const inputValue = inputCountry.value.trim().toLowerCase();
    const optionRegion = selectRegion.value;
   
    if(inputValue != "" && optionRegion != ""){
        const filterCountries = countries.filter(country => country.name.toLowerCase().includes(inputValue) && country.region === optionRegion)
        showCountries(filterCountries)
    }else if(inputValue != ""){
        const filterCountries = countries.filter(country => country.name.toLowerCase().includes(inputValue));
        showCountries(filterCountries)
    }else if(optionRegion != ""){
        const filterCountries = countries.filter(country => country.region === optionRegion)
        showCountries(filterCountries)
    }else{
        showCountries(countries)
    }
}

const showDetails = (country: Country[]) => {
    countryDiv.innerHTML = "";
    filter.style.display = "none"
    list.style.display = "none";
    detailsDiv.style.display = "block"

    countryDiv.insertAdjacentHTML("beforeend",`
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
                            <p class="country-domain"><b>Domain: </b>${country[0].topLevelDomain?.map(i => " "+i) || "No Domains"}</p>
                            <p class="country-currencies"><b>Currencies: </b>${country[0].currencies?.map(i => " "+i.name) || "No currencies"}</p>
                            <p class="country-languages"><b>Languages: </b>${country[0].languages?.map(i => " "+i.name) || "No languages"}</p>
                        </div>
                    </div>

                    <div class="country__info__borders">
                        <h4>Border Countries:</h4>
                        <div class="borders">
                            ${country[0].borders?.map(i => `<button class="btn-border">${getName(i)}</button>`).join("") || "<p>No borders</p>"}
                        </div>
                    </div>
        </div>
    `)

    const buttonsBorder = document.querySelectorAll(".btn-border") as NodeListOf<HTMLButtonElement>;
    buttonsBorder.forEach(btn => {
        const btnText = btn.textContent;
        const findCountry: Country[] = countries.filter(country => country.name === btnText);
        btn.addEventListener("click",()=> {
            showDetails(findCountry);
        })
    })
}

const closeDetails = () => {
    filter.style.display = 
    list.style.display = "flex";
    detailsDiv.style.display = "none";
}

const getName = (code) => {
    const findCountry: Country[] = countries.filter(country => country.alpha3Code === code);
    return findCountry[0].name;
    
}

inputCountry.addEventListener("keyup",filterCountries);
selectRegion.addEventListener("change",filterCountries);
btnBack.addEventListener("click",closeDetails)

getCountries("./data.json")


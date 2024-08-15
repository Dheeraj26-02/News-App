const API_KEY = "6443b197be374906b5d8e7ca0d10e64e";
const url = "https://newsapi.org/v2/everything?q=";
const conName = document.getElementById("conName");
const flag=document.getElementById("flag");


window.addEventListener('load', () => fetchNews());


async function fetchNews(query, country) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    if (country != null || country != undefined) {
        country = country.toUpperCase();
        flag.src=`https://flagsapi.com/${country}/flat/32.png`;
    }
    if (query == null || query == undefined) {
        conName.innerText = "World";
    }
    else{
        conName.innerText = query;
    }
    if(c>0)
    {
        conName.innerText="World";
        flag.src="world.png";
    }
    bindData(data.articles);
}
function bindData(articles) {
    const cardcontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardcontainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardcontainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} ▪️ ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}
let c=0;
const searchButton = document.getElementById("searchButton");
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click', () => {
    c++;
    const query = searchText.value;
    if (!query) return;
    fetchNews(query,"");
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})

function reload() {
    window.location.reload();
}




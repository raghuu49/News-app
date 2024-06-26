const API_KEY="4823e947b6ca4fa39f8c5c55c06e6bec";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const resp = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await resp.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById("card-container");
    const newsCardTemplate=document.getElementById("card-template");
    cardContainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDatainCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}
function fillDatainCard(cardClone,article){
    const image=cardClone.querySelector("#news-img");
    const title=cardClone.querySelector("#news-title");
    const source=cardClone.querySelector("#news-source");
    const desc=cardClone.querySelector("#news-desc");

    if(image){
        image.src=article.urlToImage||'';
    }
    else console.log('Error no image found');
    title.innerHTML=article.title;
    desc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        source.innerHTML = `${article.source.name} ${date}`;
    
    title.addEventListener('click', function() {
        window.open(article.url, '_blank'); // Open article URL in a new tab
    });
    cardClone.addEventListener('click', function() {
        window.open(article.url, '_blank'); // Open article URL in a new tab
    });
}

const searchButton=document.querySelector(".search-button");
const searchInput=document.querySelector(".news-input");
searchButton.addEventListener("click",function(){
    const searchTerm=searchInput.value.trim();
    if(searchTerm!=''){
        fetchNews(searchTerm);
    }
    else{
        console.log("Please Enter Something");
    }
});
const navLinks=document.querySelectorAll('.nav-item');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const category = this.innerHTML;
        fetchNews(category);
    });
});

const darkMode=document.querySelector(".dark-mode-toggle");
darkMode.addEventListener('click',function(){
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        darkMode.innerHTML=" Switch to Light Mode";
    }
    else darkMode.innerHTML="Switch to Dark Mode"
});


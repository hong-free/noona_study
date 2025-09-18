
let newsList = []
const menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsCategory(event)))

const getLatestNew = async () => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles
  render()
  console.log(newsList)
}
const getNewsCategory = async (event) => {
  const category = event.target.textContent.toLowerCase()
  console.log(category)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles
  render()

}
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value

  console.log(keyword)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`)
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles

  render()
}



const render = () => {

  const newsHTML = newsList.map((news) => `<div class="row news">
          <div class="col-lg-4">
            <img  class="news-img-size" src=
              ${news.urlToImage}
            /> 
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description == null || news.description == "" ? "내용없음"
      : news.description.length > 200
        ? news.description.substr(0, 200) + "..."
        : news.description
    }</p>
            <div>
           ${news.source.name ? news.source.name : "No Sources"}*
            ${moment(news.publishedAt).fromNow()}
          </div>
          </div>
        </div>`).join('');


  document.getElementById('news-board').innerHTML = newsHTML

}



getLatestNew()


//검색창///////////////////////////////////////////
let searchIcon = document.querySelector('.searchIcon')
let search = document.querySelector('.search')
let clear = document.querySelector('.clear')
let trigger = document.querySelector('.trigger')
let menusAll = document.querySelector('.menus')
let searchInput = document.getElementById('search-input')



searchIcon.addEventListener("click", () => {
  getNewsByKeyword()

  search.classList.add('active')
  clear.classList.add('active')
});


clear.addEventListener("click", () => {
  searchInput.value = ''
  search.classList.remove('active')
  clear.classList.remove('active')
});

searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    getNewsByKeyword()
  }
});
//햄버거버튼
trigger.addEventListener("click", () => {
  trigger.classList.toggle("active")
  menusAll.classList.toggle("active")
});
















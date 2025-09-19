
let newsList = []
const menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsCategory(event)))
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("no result for this search")
      }
      newsList = data.articles;

      render();

    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.log(error.message)
    errorRender(error.message);
  }
}




const getLatestNew = async () => {
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
  console.log(url)
  getNews()
}
//카테고리로 불로오기
const getNewsCategory = async (event) => {
  const category = event.target.textContent.toLowerCase()
  console.log(category)
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)
  getNews()
}

//키워드별로 불로오기
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value

  console.log(keyword)
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`)
  getNews()

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


const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
 ${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML
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
















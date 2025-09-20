
let newsList = []
const menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsCategory(event)))
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)

const getNews = async () => {
  try {
    url.searchParams.set("page", page)
    url.searchParams.set("pageSize", pageSize)
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("no result for this search")
      }
      if (data.totalResults == 0) {
        page = 0;
        totalPage = 0;
        renderPagination();
        throw new Error("검색어와 일치하는 결과가 없습니다");
      }
      newsList = data.articles;
      totalResults = data.totalResults
      render();
      paginationRender();

    } else {
      page = 0;
      totalPage = 0;
      renderPagination();
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message)
    errorRender(error.message);
    page = 0;
    totalPage = 0;
    renderPagination();
  }
}




const getLatestNew = async () => {
  page = 1
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
  console.log(url)
  getNews()
}
/*---------카테고리로 불로오기------*/
const getNewsCategory = async (event) => {
  const category = event.target.textContent.toLowerCase()
  page = 1
  console.log(category)
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)
  getNews()
}

/*----------키워드별로 불로오기-------*/
const getNewsByKeyword = async () => {
  page = 1
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




/*----------페이지네이션---------- */
//totalResult, 토탈결과수
//page 현재보고있는 페이지
//pageSize 보여주는 결과를 보여줄지
//groupSize 페이지 그룹사이즈
//pageGroup 몇번째 속해있는지
//lastPage 그룹의 마지막페이지번호
//firstPage 그룹의 첫번째페이지번호
//totalPages 그룹의 토탈수

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const paginationRender = () => {
  let paginationHTML = ``;
  const totalPages = Math.ceil(totalResults / pageSize)
  const pageGroup = Math.ceil(page / groupSize)//pageGroup 몇번째 그룹속해있는지

  // let last = pageGroup * 5; // lastPage 그룹의 마지막페이지번호
  // if (last > totalPages) {
  //   last = totalPages;
  // }
  // let first = last - 4 < 0 ? 1 : last - 4;

  let lastPage = pageGroup * groupSize
  if (lastPage > totalPages) {
    lastPage = totalPages
  }

  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);


  if (page > 1) {
    paginationHTML = `
  <li class="page-item" onclick="moveToPage(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="moveToPage(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }
  for (let i = firstPage; i <= lastPage; i++) {

    paginationHTML += `
    <li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link" >${i}</a></li>`
  }
  if (page < totalPages) {


    paginationHTML += ` 
    <li class="page-item" onclick="moveToPage(${page + 1})">
     <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                       </li>
<li class="page-item" onclick="moveToPage(${totalPages})">
                        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                       </li>`

  }
  document.querySelector(".pagination").innerHTML = paginationHTML
}
const moveToPage = (pageNum) => {
  page = pageNum
  getNews()
  console.log(pageNum)
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














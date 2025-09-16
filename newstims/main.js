// const API_KEY = `6cd138368d594f358e0f28deaf18ad00`;
let news = []

const getLatestNews = async () => {
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/`);
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles;
  console.log(news)
}
getLatestNews();





















// // const API_KEY = '6cd138368d594f358e0f28deaf18ad00'
// let newsList = [];
// const menus = document.querySelectorAll(".menus button")
// menus.forEach(menus => menus.addEventListener("click", (event) => getNewsByCategory(event)))

// let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/`)
// let totalResults = 0
// let page = 1
// const pageSize = 20
// const groupSize = 5

// const getNews = async () => {
//   try {
//     url.searchParams.set("page", page)
//     url.searchParams.set("pageSize", pageSize)
//     const response = await fetch(url);
//     const data = await response.json();
//     if (response.status === 200) {
//       if (data.articles.length === 0) {
//         throw new Error("no result for this search")
//       }
//       newsList = data.articles;
//       totalResults = data.totalResults;
//       render();
//       paginationRender();
//     } else {
//       throw new Error(data.message)
//     }
//   } catch (error) {
//     errorRender(error.message);
//   }
// }

// const getLatestNews = async () => {
//   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr>`
//   );
//   getNews()
// };

// const getNewsByCategory = async (event) => {
//   const category = event.target.textContent.toLowerCase();
//   console.log("category", category);
//   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=Business`
//   );
//   getNews()
// };

// const getNewsByKeyword = async () => {
//   const keyword = document.getElementById("serch-input").value;
//   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=유재석`
//   );
//   getNews()
// };

// const render = () => {
//   const newsHTML = newsList.map(
//     (news) => ` <div class="row news">
//           <div class="col-lg-4">
//             <img class="news-img-size"
//               src=${news.urlToImage}/>
//           </div>
//           <div class="col-lg-8">
//             <h2>${news.title}</h2>
//             <p>
//             ${news.description}
//             </p>
//             <div>
//             ${news.source.name} * ${news.publishedAt}
//             </div>
//           </div>
//         </div>`
//   ).join("");
//   document.getElementById("news-board").innerHTML = newsHTML;
// };
// const errorRender = (errorMessage) => {
//   const errorHTML = `<div">
//  ${errorMessage}
// </div>`;
//   document.getElementById("news-board").innerHTML = errorHTML
// }



// const paginationRender = () => {
//   const totalPages = Math.ceil(totalResults / pageSize)
//   const pageGroup = Math.ceil(page / groupSize);

//   let lastPage = pageGroup * groupSize;
//   if (lastPage > totalPages) {
//     lastPage = totalPages;
//   }



//   const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

//   let paginationHTML = ``

//   for (let i = firstPage; i <= lastPage; i++) {
//     paginationHTML += `<li class="page-item ${i === page ? "active" : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
//   }

//   document.querySelector(".pagination").innerHTML = paginationHTML


// };
// const moveToPage = (pageNum) => {
//   console.log(pageNum)
//   page = pageNum
//   getNews()
// }

// getLatestNews();


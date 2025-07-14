function button() {
    const keyword = document.getElementById("keyword").value.trim().toLowerCase(); //여백 없앰, 대소문자 구별X 아이디 가지고 옴옴
    const items = document.querySelectorAll(".img_1"); //모든 상품을 불러옴옴
    const container = document.querySelector(".items_1");
    const footer = document.getElementById("footer");
    // const body = document.querySelector('body');

    let matchCount = 0;

    items.forEach(item => { //키워드 확인
      const name = item.querySelector("span").textContent.toLowerCase(); //그 상품 이름(글자)을 가져옴
      item.style.display = name.includes(keyword) ? "block" : "none"; //키워드가 있으면 상품을 보여주고 없으면 none
      matchCount += name.includes(keyword) ? 1 : 0;
    });

    if (keyword && matchCount <= 8) {
          container.style.flexWrap = "nowrap";
          container.style.overflowX = "auto";
          // container.style.justifyContent = "flex-start";
          // container.style.paddingRight = "75px";
          footer.style.transform = "translateY(792%)"
          // footer.style.position = "relative";
          // footer.style.bottom = '0px';
          document.body.style.height = '100%';
          // footer.style.display = "none";
          // alert('123');
      } else {
          container.style.flexWrap = "wrap";
          container.style.overflowX = "unset";
          container.style.justifyContent = "center";
      }
  }


// const name = item.querySelector("span").textContent.toLowerCase();
// item.style.display = name.includes(keyword) ? "block" : "none";

// function button() {
//   const keyword = document.getElementById("keyword").value.trim().toLowerCase();
//   const items = document.querySelectorAll(".img_1");
//   const container = document.querySelector(".items_1");

//   let matchCount = 0;

//   items.forEach(item => {
//     const text = item.textContent.toLowerCase() + item.querySelector("img").alt.toLowerCase();
//     if (text.includes(keyword)) {
//       item.parentElement.style.display = "block"; // <a> 태그 기준
//       matchCount++;
//     } else {
//       item.parentElement.style.display = "none";
//     }
//   });

//   if (keyword && matchCount > 0) {
//     container.style.flexWrap = "nowrap";
//     container.style.overflowX = "auto";
//     container.style.justifyContent = "flex-start";
//     container.style.paddingLeft = "75px";
//   } else {
//     container.style.flexWrap = "wrap";
//     container.style.overflowX = "unset";
//     container.style.justifyContent = "center";
//   }
// }


// function filterItems() {
//   const keyword = document.getElementById("keyword").value.trim().toLowerCase();
//   const items = document.querySelectorAll(".img_1");

//   items.forEach(item => {
//       const text = item.innerText.toLowerCase(); // 텍스트 전체 확인
//       if (text.includes(keyword)) {
//           item.style.display = "block";
//       } else {
//           item.style.display = "none";
//       }
//   });

//   if (keyword && matchCount > 0) {
//          container.style.flexWrap = "nowrap";
//          container.style.overflowX = "auto";
//          container.style.justifyContent = "flex-start";
//          container.style.paddingLeft = "75px";
//        } else {
//          container.style.flexWrap = "wrap";
//          container.style.overflowX = "unset";
//        container.style.justifyContent = "center";
//        }
// }

//   const slider = document.querySelector('article>.frame>ul');
// const arrows = document.querySelector('.arrows');
// const arrowleft = document.querySelector('.arrows>img');
// const arrowright = document.querySelector('.arrows>img:last-child');
// let page = 0;


// arrows.addEventListener('click', (event) => {
//     if (event.target===arrowleft && page > 0){
//         page--;
//     }
//     else if (event.target===arrowright && page < 2) {
//         page++;
//     }
//     slider.style.transform = `translate(${page*(-800)}px)`
// });
//     // slider.style.translate = 'translate(-800px)'


//     document.addEventListener('DOMContentLoaded', () => {
//         const user = localStorage.getItem('user');
//         const pic = localStorage.getItem('profilePic');

//         const authLinks = document.getElementById('auth-links');
//         const profileSection = document.getElementById('profile-section');
//         const profilePic = document.getElementById('profile-pic');
//         const userGreeting = document.getElementById('user-greeting');

//         if (user) {
//           // Hide login/signup
//           authLinks.style.display = 'none';

//           // Show profile section
//           profileSection.style.display = 'inline-flex';
//           userGreeting.textContent = `Hi, ${user}`;

//           if (pic) {
//             profilePic.src = pic;
//           }

//           // Optional logout behavior
//           profileSection.addEventListener('click', () => {
//             if (confirm('로그아웃 하시겠습니까?')) {
//               localStorage.removeItem('user');
//               localStorage.removeItem('profilePic');
//               location.reload();
//             }
//           });
//         } else {
//           // Not logged in
//           authLinks.style.display = 'inline-flex';
//           profileSection.style.display = 'none';
//         }
//       });

// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }


// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

console.log(document.querySelector('.cart'))
const hrt = () => {

  const A = document.querySelectorAll('.cart');
  A.forEach(element => {
    element.addEventListener('click', (e) => {
      const btn = e.target;
      btn.textContent = btn.textContent === "🤍" ? "❤️" : "🤍";
      btn.style.fontSize = "20px";
    });
  })
}

hrt()

// hrt(){
//   const A = document.querySelector(".cart");
//   A.innerHTML = "❤";
// }

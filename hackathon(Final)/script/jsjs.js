// const slider = document.querySelector('article>.frame>ul');
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
    // slider.style.translate = 'translate(-800px)'


    // document.addEventListener('DOMContentLoaded', () => {
    //     const user = localStorage.getItem('user');
    //     const pic = localStorage.getItem('profilePic');
     
    //     const authLinks = document.getElementById('auth-links');
    //     const profileSection = document.getElementById('profile-section');
    //     const profilePic = document.getElementById('profile-pic');
    //     const userGreeting = document.getElementById('user-greeting');
     
    //     if (user) {
    //       // Hide login/signup
    //       authLinks.style.display = 'none';
     
    //       // Show profile section
    //       profileSection.style.display = 'inline-flex';
    //       userGreeting.textContent = `Hi, ${user}`;
     
    //       if (pic) {
    //         profilePic.src = pic;
    //       }
     
    //       // Optional logout behavior
    //       profileSection.addEventListener('click', () => {
    //         if (confirm('로그아웃 하시겠습니까?')) {
    //           localStorage.removeItem('user');
    //           localStorage.removeItem('profilePic');
    //           location.reload();
    //         }
    //       });
    //     } else {
    //       // Not logged in
    //       authLinks.style.display = 'inline-flex';
    //       profileSection.style.display = 'none';
    //     }
    //   });
     
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const text = document.querySelector(".text");

  const con = document.querySelector(".Q_texts");

  text.addEventListener("click", () => {
    addTodo();
  });

//   input.addEventListener("keydown", (event) => {
//     if (event.key !== "Enter") return;
//     addTodo();
//   });

  function addTodo() {
    if (!input.value.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    const user = localStorage.getItem("user") || "익명";

    con.innerHTML += `<li>${user}님이 작성함<br><span>↳${input.value}</span><div><button>삭제</button></div></li>`;
    input.value = "";
    
    delBtn();
  }
  

  function delBtn() {
    const delBtn = document.querySelectorAll(".Q_texts button");
    delBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest("li").remove();
      });
    });
  }
}); 


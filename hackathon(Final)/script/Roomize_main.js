document.addEventListener("DOMContentLoaded", () => {
  // ==== Profile Display Logic ====
  const user = localStorage.getItem("user");
  const pic = localStorage.getItem("profilePic");
  console.log(user)

  const authLinks = document.getElementById("auth-links");
  const profileSection = document.getElementById("profile-section");
  const profilePic = document.getElementById("profile-pic");
  const userGreeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  if (user) {
    authLinks.style.display = "none";
    profileSection.style.display = "inline-flex";
    userGreeting.textContent = `Hello, ${user}님`;

    if (pic) {
      profilePic.src = pic;
      profilePic.style.display = "inline-block";
    } else {
      profilePic.style.display = "none";
    }

    profileSection.addEventListener("click", () => {
      if (confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("profilePic");
        location.reload();
      }
    });
  } else {
    authLinks.style.display = "inline-flex";
    profileSection.style.display = "none";
  }

  // ==== Slider Logic ====
  const slider = document.querySelector("article>.frame>ul");
  const arrows = document.querySelector(".arrows");
  const arrowleft = document.querySelector(".arrows>img");
  const arrowright = document.querySelector(".arrows>img:last-child");
  let page = 0;

  if (arrows && slider) {
    arrows.addEventListener("click", (event) => {
      if (event.target === arrowleft && page > 0) {
        page--;
      } else if (event.target === arrowright && page < 2) {
        page++;
      }
      slider.style.transform = `translate(${page * -800}px)`;
    });
  }
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

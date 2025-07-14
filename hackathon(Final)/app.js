// Dropdown menu toggle
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

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
})

const form = document.getElementById('promptForm');
const input = document.getElementById('promptInput');
const status = document.getElementById('status');
const canvas = document.getElementById('roomCanvas');
const ctx = canvas.getContext('2d');

// Handle prompt form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) {
    status.textContent = 'Please enter a prompt.';
    return;
  }

  status.textContent = 'Generating room...';

  try {
    const response = await fetch('http://localhost:3000/api/generate-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.success) {
      status.textContent = 'Room generated!';
      drawRoom(data.room);
    } else {
      status.textContent = 'Failed to generate room: ' + (data.error || 'Unknown error');
      clearCanvas();
    }
  } catch (error) {
    status.textContent = 'Error: ' + error.message;
    clearCanvas();
  }
});

// Clears the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Snap helper for grid
function snap(val, grid = 10) {
  return Math.round(val / grid) * grid;
}

// Draw a light grid on canvas
function drawGrid(spacing = 10, color = '#ddd') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Furniture image paths
const furnitureImages = {
  bed: './images/bed.png',
  chair: './images/chair.png',
  table: './images/table.png',
  sofa: './images/sofa.png',
  toilet: './images/furniture/toilet.png',
  sink: './images/sink.png',
  bookshelf: './images/furniture/bookshelf.png',
  desk: './images/furniture/desk.png',
  stove: './images/stove.png',
  closet: './images/closet.png',
  contertop: './images/counterTop.png',
  plant: './images/plant.png',
  mat: './images/mat.png',
  rug: './iimages/rug.png'
  // Add more as needed
};

// Preload images once
const preloadedImages = {};

function preloadImages(imagePaths, callback) {
  const keys = Object.keys(imagePaths);
  let loadedCount = 0;
  keys.forEach(key => {
    const img = new Image();
    img.src = imagePaths[key];
    img.onload = () => {
      loadedCount++;
      if (loadedCount === keys.length && callback) callback();
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${imagePaths[key]}`);
      loadedCount++;
      if (loadedCount === keys.length && callback) callback();
    };
    preloadedImages[key] = img;
  });
}

// Draw furniture from preloaded images with fallback
function drawFurnitureImage(type, x, y, w, h, fallbackColor, label) {
  const img = preloadedImages[type];
  if (img && img.complete && img.naturalWidth !== 0) {
    ctx.drawImage(img, x, y, w, h);
  } else {
    // fallback: draw colored rect and label
    ctx.fillStyle = fallbackColor;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'black';
    ctx.font = `${12}px sans-serif`;
    ctx.fillText(label, x + 4, y + 14);
  }
}

let currentRoom = null;
let draggingItem = null;
let offsetX = 0;
let offsetY = 0;

function drawRoom(room) {
  currentRoom = room;

  clearCanvas();

  const maxDimension = 600;
  const scale = Math.min(maxDimension / room.width, maxDimension / room.height, 1);

  canvas.width = room.width * scale;
  canvas.height = room.height * scale;

  // Floor color fallback to gray if none or invalid
  const floorColor = room.floor?.color?.toLowerCase();
  const validColors = ['gray', 'white', 'black', 'brown', 'lightgray', 'lightgrey', 'beige', 'tan', 'lightblue', 'lightgreen']; 
  ctx.fillStyle = floorColor && validColors.includes(floorColor) ? room.floor.color : 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid
  drawGrid(10);

  // Walls
  ctx.strokeStyle = room.walls?.color || 'black';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Door
  if (room.door) {
    const { x, y } = room.door.position || { x: 0, y: 0 };
    const { width, height } = room.door.size || { width: 50, height: 20 };
    ctx.fillStyle = room.door.color || 'black';
    ctx.fillRect(x * scale, y * scale, width * scale, height * scale);
  }

  // Furniture
  (room.furniture || []).forEach(f => {
    const x = snap((f.position?.x || 0) * scale);
    const y = snap((f.position?.y || 0) * scale);

    // Individual size if provided, else default 60x60 scaled
    const w = f.size?.width ? snap(f.size.width * scale) : 60;
    const h = f.size?.height ? snap(f.size.height * scale) : 60;

    const color = f.color || 'gray';

    if (furnitureImages[f.type]) {
      drawFurnitureImage(f.type, x, y, w, h, color, f.type);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = 'black';
      ctx.font = `${12 * scale}px sans-serif`;
      ctx.fillText(f.type || '', x + 4 * scale, y + 14 * scale);
    }
  });
}

// Find furniture at mouse coordinates
function getFurnitureAt(x, y) {
  if (!currentRoom) return null;
  return currentRoom.furniture.find(f => {
    const fx = snap(f.position.x);
    const fy = snap(f.position.y);
    const fw = f.size?.width ? snap(f.size.width) : 60;
    const fh = f.size?.height ? snap(f.size.height) : 60;
    return x >= fx && x <= fx + fw && y >= fy && y <= fy + fh;
  });
}

// Mouse down: start dragging
canvas.addEventListener('mousedown', (e) => {
  if (!currentRoom) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const scale = canvas.width / currentRoom.width;

  const item = getFurnitureAt(mouseX / scale, mouseY / scale);
  if (item) {
    draggingItem = item;
    offsetX = (mouseX / scale) - item.position.x;
    offsetY = (mouseY / scale) - item.position.y;
  }
});

// Mouse move: drag furniture and redraw
canvas.addEventListener('mousemove', (e) => {
  if (!draggingItem || !currentRoom) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const scale = canvas.width / currentRoom.width;
  

  draggingItem.position.x = Math.max(0, snap((mouseX / scale) - offsetX));
  draggingItem.position.y = Math.max(0, snap((mouseY / scale) - offsetY));

  drawRoom(currentRoom);
});

// Mouse up: stop dragging
canvas.addEventListener('mouseup', () => {
  draggingItem = null;
});

// Preload images on script start
preloadImages(furnitureImages, () => {
  console.log('Furniture images preloaded');
});

  // ==== Profile Display Logic ====
  const user = localStorage.getItem("user");
  const pic = localStorage.getItem("profilePic");

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
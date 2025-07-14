// Exporting the drawRoom function so it can be reused in other files
export function drawRoom(room, ctx) {
  const scale = 1; // Scale factor to adjust drawing size (you can modify later for zoom support)

  // Set canvas size based on room dimensions
  ctx.canvas.width = room.width * scale;
  ctx.canvas.height = room.height * scale;

  // Clear previous canvas content
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // === Draw Floor ===
  ctx.fillStyle = room.floor?.color || 'gray'; // Use provided floor color or default to gray
  ctx.fillRect(0, 0, room.width * scale, room.height * scale); // Fill entire background

  // === Draw Walls as Border ===
  ctx.strokeStyle = room.walls?.color || 'black'; // Wall color or default to black
  ctx.lineWidth = 10; // Wall thickness
  ctx.strokeRect(0, 0, room.width * scale, room.height * scale); // Outline the room

  // === Draw Door ===
  if (room.door?.position && room.door?.size) {
    ctx.fillStyle = room.door.color || 'black'; // Door color
    ctx.fillRect(
      room.door.position.x * scale,
      room.door.position.y * scale,
      room.door.size.width * scale,
      room.door.size.height * scale
    );
  }

  // === Helper: Load and draw an image ===
  function drawImageElement(src, x, y, width, height) {
    const img = new Image(); // Create a new image element
    img.src = src; // Set image path
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height); // Draw image on canvas when loaded
    };
  }

  // === Draw Furniture ===
  (room.furniture || []).forEach(f => {
    // Calculate scaled position and size
    const x = (f.position?.x || 0) * scale;
    const y = (f.position?.y || 0) * scale;
    const w = (f.size?.width || 50) * scale;
    const h = (f.size?.height || 50) * scale;

    // === Use image for certain furniture types ===
    if (f.type === 'chair') {
      drawImageElement('./images/chair.png', x, y, w, h); // Custom chair image
    } else if (f.type === 'table') {
      drawImageElement('./images/table.png', x, y, w, h); // Custom table image
    } else {
      // Fallback: draw a rectangle with color
      ctx.fillStyle = f.color || 'gray';
      ctx.fillRect(x, y, w, h);
    }

    // === Draw label (e.g., "chair", "table") ===
    ctx.fillStyle = 'black';
    ctx.font = '12px sans-serif';
    ctx.fillText(f.type || '', x + 4, y + 14); // Label is slightly offset inside the object
  });
}

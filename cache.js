document.getElementById("calculateButton").addEventListener("click", () => {
  const cacheBlocks = parseInt(document.getElementById("inputCache").value);
  const memoryBlocks = parseInt(document.getElementById("inputMemory").value);
  const blockSize = parseInt(document.getElementById("inputBlockSize").value);

  if (isNaN(cacheBlocks) || isNaN(memoryBlocks) || isNaN(blockSize)) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  // Clear previous diagrams
  document.getElementById("memoryDiagram").innerHTML = "";
  document.getElementById("cacheDiagram").innerHTML = "";

  const memoryBlockElems = createDiagram(
    memoryBlocks,
    "memoryDiagram",
    "Memory"
  );
  const cacheBlockElems = createDiagram(cacheBlocks, "cacheDiagram", "Cache");
  setTimeout(() => {
    const container = document.getElementById("diagram");

    // Clear previous arrows
    const oldSVGs = container.querySelectorAll("svg");
    oldSVGs.forEach((svg) => svg.remove());

    for (let i = 0; i < memoryBlocks; i++) {
      const cacheIndex = i % cacheBlocks;
      drawArrow(memoryBlockElems[i], cacheBlockElems[cacheIndex], container);
    }
  }, 100);
});

/**********/
/**
 * Creates a visualization of a memory block diagram
 * @param {number} numBlocks - The number of blocks to create in the diagram
 * @param {string} containerId - The id of the element where the diagram should be appended
 * @param {string} label - The label to be displayed above the diagram
 */
/**********/
function createDiagram(numBlocks, containerId, label) {
  const container = document.getElementById(containerId);
  const title = document.createElement("h3");
  title.textContent = label + " Blocks";
  container.appendChild(title);

  const blockContainer = document.createElement("div");
  blockContainer.style.display = "flex";
  blockContainer.style.flexDirection = "column";
  blockContainer.style.border = "1px solid #333";
  blockContainer.style.width = "fit-content";
  blockContainer.style.marginBottom = "20px";
  blockContainer.style.position = "relative";

  const bitsNeeded = Math.ceil(Math.log2(numBlocks));
  const blockElements = [];

  for (let i = 0; i < numBlocks; i++) {
    const block = document.createElement("div");
    block.textContent = i + ": " + i.toString(2).padStart(bitsNeeded, "0");
    block.style.border = "1px solid #666";
    block.style.padding = "25px 50px";
    block.style.textAlign = "center";
    block.style.backgroundColor = "#f2f2f2";
    block.style.margin = "2px";
    block.style.fontFamily = "monospace";
    block.style.position = "relative";

    blockContainer.appendChild(block);
    blockElements.push(block);
  }

  container.appendChild(blockContainer);
  return blockElements;
}

function drawArrow(fromEl, toEl, container) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.zIndex = "0";
  svg.style.pointerEvents = "none";

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const offset = 150;

  const startX = fromRect.right - containerRect.left - offset;
  const startY = fromRect.top + fromRect.height / 2 - containerRect.top;

  const endX = toRect.left - containerRect.left + offset;
  const endY = toRect.top + toRect.height / 2 - containerRect.top;

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "marker"
  );
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "0");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,0 L0,7 L10,3.5 z");
  path.setAttribute("fill", "red");
  marker.appendChild(path);
  defs.appendChild(marker);

  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow.setAttribute("x1", startX);
  arrow.setAttribute("y1", startY);
  arrow.setAttribute("x2", endX);
  arrow.setAttribute("y2", endY);
  arrow.setAttribute("stroke", "red");
  arrow.setAttribute("stroke-width", "2");
  arrow.setAttribute("marker-end", "url(#arrowhead)");

  svg.appendChild(defs);
  svg.appendChild(arrow);
  container.appendChild(svg);
}

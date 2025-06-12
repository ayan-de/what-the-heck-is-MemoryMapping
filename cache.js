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

  createDiagram(memoryBlocks, "memoryDiagram", "Memory");
  createDiagram(cacheBlocks, "cacheDiagram", "Cache");
});

/***********/
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

  const bitsNeeded = Math.ceil(Math.log2(numBlocks));

  for (let i = 0; i < numBlocks; i++) {
    const block = document.createElement("div");
    block.textContent = i + ": " + i.toString(2).padStart(bitsNeeded, "0");
    block.style.border = "1px solid #666";
    block.style.padding = "25px 50px";
    block.style.textAlign = "center";
    block.style.backgroundColor = "#f2f2f2";
    block.style.margin = "2px";
    block.style.fontFamily = "monospace";
    blockContainer.appendChild(block);
  }

  container.appendChild(blockContainer);
}

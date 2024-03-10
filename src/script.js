import data from "./testData.json" assert { type: "json" };

const sectionElement = document.querySelector(".content");
const svgButton = document.querySelector(".button-svg");
const dwgButton = document.querySelector(".button-dwg");
const cadButton = document.querySelector(".button-cad");
const infoButton = document.querySelector(".button-info");
const nothingFoundString = 'Пока тут ничего нет, но скоро появится!';
const infoString = 'Привет, на связи DWGLIB! Скоро здесь будет подробная инструкция, как мной пользоваться, но сейчас я просто транслирую тестовые данные..'

const returnArrayOf = (fileType) => {
  const dataJSON = data;
  const ulElement = document.createElement("ul");
  const outerScopeLIElements = [];
  for (const key in dataJSON) {
    if (dataJSON[key].type === fileType) {
      const liElement = document.createElement("li");
      const aElement = document.createElement("a");
      const imgElement = document.createElement("img");
      const h2Element = document.createElement("h2");
      aElement.className = "content-card";
      aElement.href = dataJSON[key].url;
      imgElement.src = dataJSON[key].title_img;
      h2Element.textContent = dataJSON[key].title;
      aElement.appendChild(imgElement);
      aElement.appendChild(h2Element);
      liElement.appendChild(aElement);
      outerScopeLIElements.push(liElement);
    }
  }
  ulElement.className = "content-list";
  if (outerScopeLIElements.length > 0) {
    outerScopeLIElements.forEach((key) => ulElement.appendChild(key));
    sectionElement.appendChild(ulElement);
  } else {
    textInSectionElement(nothingFoundString);
  }
};

const addContentHeader = (str) => {
  const contentHeaderElement = document.createElement("h3");
  contentHeaderElement.className = "content-header";
  contentHeaderElement.textContent = str;
  sectionElement.appendChild(contentHeaderElement);
};

const textInSectionElement = (str) => {
    const pElement = document.createElement("p");
    pElement.textContent = str;
    pElement.className = "content-paragraph";
    sectionElement.appendChild(pElement);
}

svgButton.addEventListener(`click`, function () {
  const removeLiInSectionElement = (sectionElement.textContent = "");
  const changeContentHeader = addContentHeader("SVG");
  const svgScreenOutput = returnArrayOf("svg");
});

dwgButton.addEventListener(`click`, function () {
  const removeLiInSectionElement = (sectionElement.textContent = "");
  const changeContentHeader = addContentHeader("DWG");
  const dwgScreenOutput = returnArrayOf("dwg");
});

cadButton.addEventListener(`click`, function () {
  const removeLiInSectionElement = (sectionElement.textContent = "");
  const changeContentHeader = addContentHeader("CAD");
  const cadScreenOutput = returnArrayOf("cad");
});

infoButton.addEventListener(`click`, function () {
    const removeLiInSectionElement = (sectionElement.textContent = "");
    const changeContentHeader = addContentHeader("INFO");
    const infoScreenOutput = textInSectionElement(infoString);
  });

  window.onload = textInSectionElement(infoString);

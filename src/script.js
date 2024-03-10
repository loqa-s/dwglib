import data from "./testData.json" assert { type: "json" };

const sectionElement = document.querySelector(".content");
const svgButton = document.querySelector(".button-svg");
const dwgButton = document.querySelector(".button-dwg");
const cadButton = document.querySelector(".button-cad");
const infoButton = document.querySelector(".button-info");
const nothingFoundString = "Пока тут ничего нет, но скоро появится!";
const infoString =
  "Привет, на связи DWGLIB! Скоро здесь будет подробная инструкция, как мной пользоваться, но сейчас я просто транслирую тестовые данные..";

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
      aElement.id = dataJSON[key].id;
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

const buildDetailedInfoFromInputId = (inputId) => {
  const dataJSON = data;
  for (const key in dataJSON) {
    if (dataJSON[key].id === inputId) {
      const previousSectionWrapperElement = document.querySelector(".detailed");
      if (previousSectionWrapperElement) {removeHtmlElement(previousSectionWrapperElement)};

      const sectionCarcasElement = document.querySelector(".carcas");
      const sectionWrapperElement = document.createElement("section");
      const sectionInsideWrapperElement = document.createElement("section");
      const h3Element = document.createElement("h3");
      const ulElement = document.createElement("ul");
      const horizontalImagesLiElement = document.createElement("li");
      const liElement = document.createElement("li");
      const articleElement = document.createElement("article");
      const typePElement = document.createElement("p");
      const descriptionPElement = document.createElement("p");
      const footerLiElement = document.createElement("li");
      const backButton = document.createElement("button");
      const receiveButton = document.createElement("button");

      sectionWrapperElement.className = "wrapper detailed";
      sectionInsideWrapperElement.className = "content";
      h3Element.className = "content-header";
      ulElement.className = "detailed-list";
      horizontalImagesLiElement.className = "horizontal-images";
      typePElement.className = "stringWithType";
      descriptionPElement.className = "stringWithDescription";
      footerLiElement.className = "content-footer";
      backButton.className = "back-button";

      h3Element.textContent = dataJSON[key].title;
      typePElement.textContent = `Тип: ${dataJSON[key].type}`;
      descriptionPElement.textContent = dataJSON[key].description;
      backButton.textContent = "Назад";
      receiveButton.textContent = "Получить";

      footerLiElement.appendChild(backButton);
      footerLiElement.appendChild(receiveButton);

      articleElement.appendChild(typePElement);
      articleElement.appendChild(descriptionPElement);
      liElement.appendChild(articleElement);

      for (const url in dataJSON[key].preview_imgs) {
        const imgElement = document.createElement("img");
        imgElement.src = dataJSON[key].preview_imgs[url];
        horizontalImagesLiElement.appendChild(imgElement);
      }

      ulElement.appendChild(horizontalImagesLiElement);
      ulElement.appendChild(liElement);
      ulElement.appendChild(footerLiElement);

      sectionInsideWrapperElement.appendChild(h3Element);
      sectionInsideWrapperElement.appendChild(ulElement);
      sectionWrapperElement.appendChild(sectionInsideWrapperElement);

      sectionCarcasElement.appendChild(sectionWrapperElement);
    }
  }
};

const removeHtmlElement = (element) => {element.remove()};

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
};

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

document.addEventListener(`click`, function (e) {
  if (e.target.closest(".content-card")) {
    closestContentCardId = e.target.closest(".content-card").id;
    buildDetailedInfoFromInputId(closestContentCardId);
  }
});

document.addEventListener(`click`, function (e) {
  if (e.target.closest(".back-button")) {
    const removeDetailedHtmlElement = removeHtmlElement(document.querySelector(".detailed"));
  }
});

window.onload = textInSectionElement(infoString);

import data from "./testData.json" assert { type: "json" };

const sectionElement = document.querySelector(".content");
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
      aElement.classList.add("content-card", fileType);
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
    showTextInSectionElement(nothingFoundString);
  }
};

const buildDetailedInfoFromInputId = (inputId) => {
  const dataJSON = data;
  for (const key in dataJSON) {
    if (dataJSON[key].id === inputId) {
      const previousSectionWrapperElement = document.querySelector(".detailed");
      if (previousSectionWrapperElement) {
        removeHtmlElement(previousSectionWrapperElement);
      }

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

const removeHtmlElement = (element) => {
  element.remove();
};

const removeSearchParam = (param) => {
  const searchParams = new URLSearchParams(window.location.search);
  const removeId = searchParams.delete(param);
  const newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
};

const hasAnySearchParams = () => {
  return window.location.search;
};

const hasSearchParam = (str) => {
  const searchParams = new URLSearchParams(window.location.search);
  const foundedParam = searchParams.get(str);
  return foundedParam;
};

const renderContentFromSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const foundedParamType = searchParams.get("type");
  renderContent(foundedParamType);
};

const renderBlockFromSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const foundedParamId = searchParams.get("id");
  buildDetailedInfoFromInputId(foundedParamId);
};

const generateSearchParamsOnClick = (type, id) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("type", type);
  if (id) {
    searchParams.set("id", id);
  }
  const newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
};

const renderSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("type")) {
    renderContentFromSearchParams();
    if (document.querySelector(".detailed")) {
      const removeDetailedHtmlElement = removeHtmlElement(
        document.querySelector(".detailed")
      );
    }
  }
  if (searchParams.get("id")) {
    renderBlockFromSearchParams();
  }
};

const addContentHeader = (str) => {
  const contentHeaderElement = document.createElement("h3");
  contentHeaderElement.className = "content-header";
  contentHeaderElement.textContent = str;
  sectionElement.appendChild(contentHeaderElement);
};

const showTextInSectionElement = (str) => {
  const pElement = document.createElement("p");
  pElement.className = "content-paragraph";
  pElement.textContent = str;
  sectionElement.appendChild(pElement);
};

const renderContent = (fileTypeString) => {
  const removeLiInSectionElement = (sectionElement.textContent = "");
  const changeContentHeader = addContentHeader(fileTypeString.toUpperCase());
  const screenOutput =
    fileTypeString === "info"
      ? showTextInSectionElement(infoString)
      : returnArrayOf(fileTypeString);
};

document.addEventListener(`click`, function (e) {
  if (e.target.closest(".content-card")) {
    const closestContentCard = e.target.closest(".content-card");
    generateSearchParamsOnClick(
      closestContentCard.classList[1],
      closestContentCard.id
    );
    buildDetailedInfoFromInputId(closestContentCard.id);
  }
});

document.addEventListener(`click`, function (e) {
  if (e.target.closest(".button-menu")) {
    const buttonTextContent = e.target.closest(".button-menu").textContent;
    if (!hasSearchParam("id")) {
      generateSearchParamsOnClick(buttonTextContent, null);
    }
    renderContent(buttonTextContent);
  }
});

document.addEventListener(`click`, function (e) {
  if (e.target.closest(".back-button")) {
    removeSearchParam("id");
    renderContentFromSearchParams();
    const removeDetailedHtmlElement = removeHtmlElement(
      document.querySelector(".detailed")
    );
  }
});

window.addEventListener("popstate", () => {
  if (hasAnySearchParams()) {
    renderSearchParams();
  }
});

window.onload = () => {
  renderContent("info");
  if (hasAnySearchParams()) {
    renderSearchParams();
  }
};

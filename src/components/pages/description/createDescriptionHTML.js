export default function createDescriptionHTML(product) {
  const dataDescription = {
    item: new DOMParser().parseFromString(
      product.description,
      "text/html"
    ),
  };
  const resultHTML = document.createElement("div");
  let haveMainComponent;

  if (dataDescription.item.all.length > 3) {
    if (dataDescription.item.all[3].children[0]) {
      if (
        dataDescription.item.all[3].children[0].outerHTML ===
        dataDescription.item.all[4].outerHTML
      ) {
        haveMainComponent = true;
      } else {
        haveMainComponent = false;
      }
    } else {
      haveMainComponent = false;
    }
    if (haveMainComponent) {
      resultHTML.appendChild(dataDescription.item.all[3]);
    } else {
      for (
        let index = 3;
        index < dataDescription.item.all.length;
        index++
      ) {
        resultHTML.append(dataDescription.item.all[index]);
      }
    }
  } else {
    const newP = document.createElement("p");
    newP.innerText = product.description;
    resultHTML.appendChild(newP);
  }
  return resultHTML;
}

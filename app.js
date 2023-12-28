function solve() {
  let creator = document.getElementById("creator");
  let title = document.getElementById("title");
  let category = document.getElementById("category");
  let content = document.getElementById("content");

  let postBtn = document.querySelectorAll("button")[0];
  let postField = document.querySelectorAll("section")[1];
  let archiveSection = document.querySelectorAll("section")[3];

  postBtn.addEventListener("click", postContent);

  function postContent(e) {
    e.preventDefault();
    let authorV = creator.value;
    let titleV = title.value;
    let categoryV = category.value;
    let contentV = content.value;

    createArticle(authorV, titleV, categoryV, contentV);
  }

  function createArticle(authorV, titleV, categoryV, contentV) {
    let article = document.createElement("article");
    let h1 = document.createElement("h1");
    let categoryP = document.createElement("p");
    let creatorP = document.createElement("p");
    let p = document.createElement("p");
    let delBtn = document.createElement("button");
    let archiveBtn = document.createElement("button");

    let divBtns = document.createElement("div");
    let categoryStrong = document.createElement("STRONG");
    let creatorStrong = document.createElement("STRONG");

    h1.textContent = titleV;
    categoryP.textContent = `Category: `;
    creatorP.textContent = `Creator: `;

    categoryStrong.textContent = categoryV;
    creatorStrong.textContent = authorV;

    categoryP.appendChild(categoryStrong);
    creatorP.appendChild(creatorStrong);

    p.textContent = contentV;

    divBtns.classList.add("buttons");
    delBtn.textContent = "Delete";
    archiveBtn.textContent = "Archive";

    delBtn.classList.add("btn");
    delBtn.classList.add("delete");
    archiveBtn.classList.add("btn");
    archiveBtn.classList.add("archive");

    divBtns.appendChild(delBtn);
    divBtns.appendChild(archiveBtn);

    article.appendChild(h1);
    article.appendChild(categoryP);
    article.appendChild(creatorP);
    article.appendChild(p);
    article.appendChild(divBtns);

    postField.appendChild(article);

    clearInput();
    archiveBtn.addEventListener("click", moveTitle);
    delBtn.addEventListener("click", deleteAll);
  }

  function moveTitle(e) {
    let li = document.createElement("li");
    let ol = archiveSection.children[1];
    li.textContent =
      e.target.parentElement.parentElement.querySelector("h1").textContent;
    ol.appendChild(li);

    let arrOfLis = Array.from(archiveSection.querySelectorAll("li")).sort(
      (a, b) => a.textContent.localeCompare(b.textContent)
    );

    arrOfLis.forEach((el) => ol.appendChild(el));

    e.target.parentElement.parentElement.remove();
  }

  function deleteAll(e) {
    e.target.parentElement.parentElement.remove();
  }

  function clearInput() {
    creator.value = "";
    title.value = "";
    category.value = "";
    content.value = "";
  }
}

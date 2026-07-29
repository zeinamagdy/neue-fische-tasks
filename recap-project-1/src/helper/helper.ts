import type { Favorited_book } from "../types/types";
import { fav_icon, empty_fav_icon } from "./icons";

//Toggle favorite btn

function createfavButton(book: Favorited_book): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button button-clear fav-btn";

  // Set initial icon state
  button.innerHTML = book.isFavorite ? fav_icon : empty_fav_icon;

  // Attach click listener
  button.addEventListener("click", (e) => {  
    book.isFavorite = !book.isFavorite;
    button.innerHTML = book.isFavorite ? fav_icon : empty_fav_icon;
  });
  return button;
}

// TODO: Refactor and get better way for the buttons
export function createRow(book: Favorited_book): HTMLTableRowElement {
  const row = document.createElement("tr");
  const favCell = document.createElement("td");
  const favICon = createfavButton(book);
  favCell.append(favICon);
  const titleCell = document.createElement("td");
  titleCell.textContent = book.title;

  const isbnCell = document.createElement("td");
  isbnCell.textContent = book.isbn;

  const authorCell = document.createElement("td");
  authorCell.textContent = book.author;

  const publisherCell = document.createElement("td");
  publisherCell.textContent = book.publisher;

  const detailsBtn = document.createElement("button");
  detailsBtn.type = "button";
  detailsBtn.textContent = "Detail";
  detailsBtn.addEventListener("click", (e) => {
    console.log("Button clicked!");
    window.location.href = `./detail?isbn=${book.isbn}`;
  });
  row.append(
    favCell,
    titleCell,
    isbnCell,
    authorCell,
    publisherCell,
    detailsBtn,
  );
  return row;
}

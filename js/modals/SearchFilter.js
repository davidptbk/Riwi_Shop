const btnFilter = document.querySelector(".icon-met");
const select = document.getElementById("filter-categories");
const palito = document.querySelector(".palito")

document.addEventListener('DOMContentLoaded', () => {

    btnFilter.addEventListener('click', () => {
      if (select.style.display === 'none') {
        select.style.display = 'block';
      } else {
        select.style.display = 'none';
      }
    });
  });
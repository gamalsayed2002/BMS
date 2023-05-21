let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
let mood = "create";
let tmp;

// get total

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  }
}

// create product
let data;

if (
  typeof localStorage.product !== "undefined" &&
  localStorage.product !== null
) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // count and putting data in array
  if (title.value !== "" && price.value !== "" && count.value < 101) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          data.push(newpro);
        }
      } else {
        data.push(newpro);
      }
    } else {
      data[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  // save localsrotage
  localStorage.setItem("product", JSON.stringify(data));
  clear();
  showData();
};

// clear inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
}

// read
function showData() {
  let table = ``;
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteE(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  tbody.innerHTML = table;
  // delete all
  if (data.length > 0) {
    deleteAll.innerHTML = `
<button onclick="deleteall()">Delete All (${data.length})</button>
`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// delete
function deleteE(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  showData();
}
// delete all
function deleteall() {
  localStorage.clear();
  data.splice(0);
  showData();
}

// update
function updateData(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = data[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
  });
}

// search

let searchMood = "title";
function getSearchMood(id) {
  search.focus();
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "search By category";
  }
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteE(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteE(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  }
  tbody.innerHTML = table;
}

//data retrivers
let products = [];

const getProducts = async (condition = "") => {
  cleanChildNodes(cards);
  await axios
    .get(
      `https://online-shop-bsale.herokuapp.com/products/?name&url_image&price&discount${
        condition ? `&category=${condition}` : ""
      }`
    )
    .then((response) => {
      products = response.data.products;
    })
    .catch((error) => {
      swal("Error!", "No se han encontrado coincidencias", "error");
    });
};

const getProductsOnInputChange = async (searchInput = "") => {
  cleanChildNodes(cards);
  console.log("lo llaman get products on input change");
  await axios
    .get(
      `https://online-shop-bsale.herokuapp.com/products/search/${searchInput}`
    )
    .then((response) => {
      products = response.data.products;
    })
    .catch((error) => {
      swal("Error!", "No se han encontrado coincidencias", "error");
    });
};

//handle click events on nav links
const navItems = document.querySelectorAll(".nav-link");
navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".nav-link.active").classList.remove("active");
    const categoryCondition = categoryTextToCondition(e.target.textContent);
    refreshData(categoryCondition);
    e.target.classList.add("active");
  });
});
//refresh data on demand
const refreshData = (condition) => {
  cleanChildNodes(cards);
  const loginAnimation = document.getElementById("login-animation-container");
  loginAnimation.style.display = "block";
  getProducts(condition).then(() => {
    loginAnimation.style.display = "none";
    products.forEach((product) => {
      template
        .querySelector("img")
        .setAttribute(
          "src",
          product.url_image ||
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fproductleaders.org%2Fwp-content%2Fuploads%2F2017%2F05%2Fno-image-icon-2.png&f=1&nofb=1"
        );
      template.querySelector("h5").textContent =
        product.name[0].toUpperCase() + product.name.substring(1).toLowerCase();
      template.querySelector("p").textContent = `$${product.price}`;
      template.querySelector("#discount").textContent = `Antes $${
        product.price + product.discount
      }`;
      const newclone = document.importNode(template, true);
      fragment.appendChild(newclone);
    });

    cards.appendChild(fragment);
  });
};

const refreshDataOnInputChange = (searchCondition) => {
  cleanChildNodes(cards);
  const loginAnimation = document.getElementById("login-animation-container");
  loginAnimation.style.display = "block";
  getProductsOnInputChange(searchCondition).then(() => {
    loginAnimation.style.display = "none";
    products.forEach((product) => {
      template
        .querySelector("img")
        .setAttribute(
          "src",
          product.url_image ||
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fproductleaders.org%2Fwp-content%2Fuploads%2F2017%2F05%2Fno-image-icon-2.png&f=1&nofb=1"
        );
      template.querySelector("h5").textContent =
        product.name[0].toUpperCase() + product.name.substring(1).toLowerCase();
      template.querySelector("p").textContent = `$${product.price}`;
      template.querySelector("#discount").textContent = `Antes $${
        product.price + product.discount
      }`;
      const newclone = document.importNode(template, true);
      fragment.appendChild(newclone);
    });

    cards.appendChild(fragment);
  });
};
//Categories text to db id converter
const categoryTextToCondition = (text) => {
  switch (text) {
    case "Bebida Energética":
      return "1";
    case "Pisco":
      return "2";
    case "Ron":
      return "3";
    case "Bebida":
      return "4";
    case "Snack":
      return "5";
    case "Cerveza":
      return "6";
    case "Vodka":
      return "7";
    default:
      return "";
  }
};
//Child node cleaner
const cleanChildNodes = (node) => {
  cards.textContent = "";
};

// Template content loader
const cards = document.getElementById("catalog-section");
const template = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

cleanChildNodes(cards);
const loginAnimation = document.getElementById("login-animation-container");
loginAnimation.style.display = "block";
getProducts().then(() => {
  cleanChildNodes(cards);
  loginAnimation.style.display = "none";
  products.forEach((product) => {
    template
      .querySelector("img")
      .setAttribute(
        "src",
        product.url_image ||
          "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fproductleaders.org%2Fwp-content%2Fuploads%2F2017%2F05%2Fno-image-icon-2.png&f=1&nofb=1"
      );
    template.querySelector("h5").textContent =
      product.name[0].toUpperCase() + product.name.substring(1).toLowerCase();
    template.querySelector("p").textContent = `$${product.price}`;
    template.querySelector("#discount").textContent = `Antes $${
      product.price + product.discount
    }`;
    const clone = document.importNode(template, true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
});

//handle input search
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  cleanChildNodes(cards);
  const searchCondition = document.getElementById("search-input").value;
  if (!searchCondition) {
    cleanChildNodes(cards);
    refreshData();
  } else {
    cleanChildNodes(cards);
    refreshDataOnInputChange(searchCondition);
  }
});

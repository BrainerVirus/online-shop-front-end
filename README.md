# Noir online shop - Front End
Este es el repositorio del apartado front end de "nori online shop web app".

<a href="https://github.com/BrainerVirus/online-shop-back-end.git">Presiona aqui para ir al repositorio del Back-End</a>

## Instalación
Usuando el siguiente comando puedes realizar la instalación del cliente front end.

```git clone https://github.com/BrainerVirus/online-shop-front-end.git ```

O bien descaga el contenido completo como un archivo zip haciendo click aquí.

![alt text](https://i.ibb.co/0cXWX4T/descargar-el-proyecto.png)

## Uso
Se recomienda el uso de vscode con la extención live server para levantar el cliente.

## Funciones Principales
El método "getProducts" rescata la información de los productos de forma dinámica en función de una "condición", la cual
es entregado como argumento.
```
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
```
El método "getProductsOnInputChange" rescata la información de los productos de forma dinámica en función de una "condición", la cual
es entregada como argumento a la función. Ahora bien, tal condición es un string que luego es envíado al back end para generar una búsqueda productos con su
respectiva coincidencia de haber alguna, sino se retorna un error.
```
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
```
El retorno haber coincidencias sería un array con por lo menos un objeto con la siguiente estructura.
```
{name: "Pisco viejo",
price: "1000",
discount: "200",
url_image: "www.image.com/image"
category: 1}
```
Esta porción de código se encarga de inicializar un "event listener" en caso de que se haga click a una de las opciones de la navbar, para luego llamar 
al metodo que refresca el contenido de la página en función del valor de la condición definida como "categoryCondition", la cual obtiene su valor del
"target" del evento.
```
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
```
Esta función se encarga de refrescar el contenido de la página a la vez que inserta una animación de carga mientras se realiza la consulta http por medio de la función getProducts, 
entonces en su resolución satisfactoria el contenido de la página se actualiza, y, en caso contrario se envía un mensaje de error.
```
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
```
Esta función se encarga de refrescar el contenido de la página a la vez que inserta una animación de carga mientras se realiza la consulta http por medio 
de la función getProductsOnInputChange, entonces en su resolución satisfactoria el contenido de la página se actualiza, y, en caso contrario se envía un mensaje de error.
```
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
```
Por último tenemos esta pieza de código tiene como finalidad inicializar la "template" de los productos que ya está presente en el index.html, con el contenido inicial de la
página, es decir, todos los productos sin filtrar, por eso se parece mucho a las funciones "refresh" que ya vimos.
```
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
```
# License
<a href="https://github.com/BrainerVirus/online-shop-front-end/blob/main/LICENSE.MD">MIT</a>

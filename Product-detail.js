// Product Data (can be expanded easily)
const products = {
  "grundfos-a1": {
    name: "Grundfos Pump A1",
    img: "assets/grundfos.png",
    desc: "High-efficiency water pump for industrial use."
  },
  "grundfos-a2": {
    name: "Grundfos Pump A2",
    img: "https://via.placeholder.com/400x250",
    desc: "Reliable pump for residential and commercial applications."
  },
  "davery-d1": {
    name: "Davery Model D1",
    img: "https://via.placeholder.com/400x250",
    desc: "Durable pump designed for heavy-duty usage."
  },
  "goulds-x1": {
    name: "Goulds X1",
    img: "https://via.placeholder.com/400x250",
    desc: "Energy-efficient pump with long lifespan."
  }
};

// Get Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (products[productId]) {
  document.querySelector("#product-details h2").textContent = products[productId].name;
  document.querySelector("#product-img").src = products[productId].img;
  document.querySelector("#product-desc").textContent = products[productId].desc;
} else {
  document.querySelector("#product-details h2").textContent = "Product Not Found";
}

// script.js
$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createPropertyItem(price, title, address, imageUrl) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <a href=""><img class="img-fluid" src="${imageUrl}" alt=""></a>
            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
          </div>
          <div class="p-4 pb-0">
            <h5 class="text-primary mb-3">${price}</h5>
            <a class="d-block h5 mb-2" href="">${title}</a>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${address}</p>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${address}</p>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${address}</p>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${address}</p>
          </div>
          <div class="col-12 text-center mb-4" data-wow-delay="0.1s">
            <a class="btn btn-primary py-0 px-3" href="">View</a>
          </div>
        </div>
      </div>
    `;
  }

  // Append two different property items
  $("#land_list")
    .append(createPropertyItem("$12,345", "Golden Urban House For Sell", "123 Street, New York, USA", "img/property-1.jpg"))
    .append(createPropertyItem("$15,000", "Modern Apartment For Sell", "456 Avenue, Los Angeles, USA", "img/property-2.jpg"));
});
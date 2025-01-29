// script.js
$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createPropertyItem(price, title, location, image_url, property_type, bedrooms, bathrooms) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <a href=""><img class="img-fluid" src="${image_url}" alt=""></a>
            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Rental</div>
            <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${property_type}</div>
          </div>
          <div class="p-4 pb-0">
            <h5 class="text-primary mb-3">${price}</h5>
            <a class="d-block h5 mb-2" href="">${title}</a>
            <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${location}</p>
          </div>
          <div class="d-flex border-top">
            <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>${bedrooms} Bed</small>
            <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>${bathrooms} Bath</small>
          </div>
          <div class="col-12 text-center mb-4" data-wow-delay="0.1s">
            <a class="btn btn-primary py-0 px-3" href="">View</a>
          </div>
        </div>
      </div>
    `;
  }

  // Function to render pagination links
  function renderPagination(links) {
    const paginationContainer = $("#pagination");
    paginationContainer.empty(); // Clear existing pagination links

    const paginationHTML = `
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          ${links
            .map((link) => {
              if (link.url) {
                return `
                  <li class="page-item ${link.active ? "active" : ""}">
                    <a class="page-link" href="#" data-url="${link.url}">${link.label}</a>
                  </li>
                `;
              } else {
                return `
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">${link.label}</a>
                  </li>
                `;
              }
            })
            .join("")}
        </ul>
      </nav>
    `;

    paginationContainer.html(paginationHTML);
  }

  // Function to fetch properties from the API
  function fetchProperties(url) {
    $.ajax({
      url: url || "http://localhost:8000/api/properties/get", // API endpoint
      method: "GET", // HTTP method
      dataType: "json", // Expected response type
      success: function(data) {
        // Clear existing properties
        $("#properties_list").empty();

        // Check if data is an array
        if (Array.isArray(data.data)) {
          // Loop through each property and append it to the #properties_list
          data.data.forEach(function(property) {
            $("#properties_list").append(
              createPropertyItem(
                property.price,
                property.title,
                property.location,
                // property.image_url,
                'img/property-2.jpg',
                property.property_type,
                property.bedrooms,
                property.bathrooms
              )
            );
          });
        } else {
          console.error("API response is not an array:", data);
        }

        // Render pagination links
        if (data.links) {
          renderPagination(data.links);
        }
      },
      error: function(xhr, status, error) {
        console.error("Error fetching properties:", error);
      },
    });
  }

  // Initial fetch of properties
  fetchProperties();

  // Event delegation for pagination links
  $(document).on("click", ".page-link", function(e) {
    e.preventDefault();
    const url = $(this).data("url");
    if (url) {
      fetchProperties(url); // Fetch properties for the clicked page
    }
  });
});
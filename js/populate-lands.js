// script.js
$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createLandItem(id, price, title, description, location, imageUrl) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <div class="d-flex justify-content-center"><img class="img-fluid" src="${imageUrl}" alt=""></div>
            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
          </div>
          <div class="p-4 pb-0">
            <h5 class="text-primary mb-3">${price}</h5>
            <a class="d-block h5 mb-2" href="">${title}</a>
            <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${location}</p>
            <p class="my-0">${description}</p>
          </div>
          <div class="col-12 text-center mb-4" data-wow-delay="0.1s">
            <a class="btn btn-primary py-0 px-3" href="land.html?land_id=${id}">View</a>
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
  function fetchLand(url) {
    $.ajax({
      url: url || "http://localhost:8000/api/land/get", // API endpoint
      method: "GET", // HTTP method
      dataType: "json", // Expected response type
      success: function(data) {
        // Clear existing properties
        $("#land_list").empty();

        // Check if data is an array
        if (Array.isArray(data.data)) {
          // Loop through each land and append it to the #properties_list
          data.data.forEach(function(land) {
            $("#land_list").append(
              createLandItem(
                land.id,
                land.price,
                land.title,
                land.description,
                land.location,
                `localhost:8000/${land.image_url}`,
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
        console.error("Error fetching land:", error);
      },
    });
  }

  // Initial fetch of properties
  fetchLand();

  // Event delegation for pagination links
  $(document).on("click", ".page-link", function(e) {
    e.preventDefault();
    const url = $(this).data("url");
    if (url) {
      fetchLand(url); // Fetch properties for the clicked page
    }
  });
});
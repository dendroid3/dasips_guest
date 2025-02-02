// script.js
const api_url = "http://localhost:8000";

$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createPropertyItem(property_id ,price, title, location, image_url, property_type, bedrooms, bathrooms) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <div class="d-flex justify-content-center"><img class="img-fluid" src="${image_url}" alt=""></div>
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
            <a class="btn btn-primary py-0 px-3" href="property.html?property_id=${property_id}">View</a>
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
      url: url || `${api_url}/api/properties/get`, // API endpoint
      method: "GET", // HTTP method
      dataType: "json", // Expected response type
      success: function(data) {
        // Clear existing properties
        $("#properties_list").empty();

        // Check if data is an array
        if (Array.isArray(data.data)) {
          // Loop through each property and append it to the #properties_list
          data.data.forEach(function(property) {
            const image_url = property.image_url ? `${api_url}${property.image_url}` : "img/property-2.jpg";
            console.log(image_url);
            $("#properties_list").append(
              createPropertyItem(
                property.id,
                property.price,
                property.title,
                property.location,
                image_url,
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

  function fetchLocationAndTypes() {
    $.ajax({
      url: `${api_url}/api/properties/types_and_locations`,
      method: 'GET',
      success: function(response) {
          // Populate the location dropdown
          let $locationSelect = $('#select_location');
          $locationSelect.append('<option selected>Location</option>'); // Default option

          // Add locations to the dropdown
          response.forEach(function(item) {
              $locationSelect.append(`<option value="${item.location}">${item.location}</option>`);
          });

          // Enable the type dropdown when a location is selected
          $locationSelect.on('change', function() {
              let selectedLocation = $(this).val();
              let $typeSelect = $('#select_type');

              if (selectedLocation === 'Location') {
                  // Reset and disable the type dropdown if no valid location is selected
                  $typeSelect.empty().append('<option selected>Type</option>').prop('disabled', true);
              } else {
                  // Enable the type dropdown and populate it with property types for the selected location
                  $typeSelect.empty().append('<option selected>Type</option>').prop('disabled', false);

                  // Find the selected location's property types
                  let selectedLocationData = response.find(item => item.location === selectedLocation);
                  if (selectedLocationData && selectedLocationData.property_types) {
                      selectedLocationData.property_types.forEach(function(type) {
                          $typeSelect.append(`<option value="${type.property_type}">${type.property_type}</option>`);
                      });
                  }
              }
          });

          // Initialize the type dropdown as disabled
          $('#select_type').prop('disabled', true).append('<option selected>Type</option>');
      },
      error: function(xhr, status, error) {
          console.error('Error fetching data:', error);
      }
    });
  }

  // Initial fetch of location and types
  fetchLocationAndTypes();
  // Initial fetch of properties
  fetchProperties();

  // Event delegation for searching property of location and type
  $(document).on("click", "#search_button", function(e) {
    let selectedLocation = $('#select_location').val();
    let selectedType = $('#select_type').val();

    // Check if valid options are selected
    if (selectedLocation === 'Location' || selectedType === 'Type') {
        alert('Please select a valid location and property type.');
    } else {
        let url = `${api_url}/api/properties/get?location=${selectedLocation}&property_type=${selectedType}`;
        fetchProperties(url); // Fetch properties based on selected location and type
    }
  });

  // Event delegation for pagination links
  $(document).on("click", ".page-link", function(e) {
    e.preventDefault();
    let url = $(this).data("url");
    let selectedLocation = $('#select_location').val();
    let selectedType = $('#select_type').val();

    if (selectedLocation === 'Location' || selectedType === 'Type') {
      if (url) {
        fetchProperties(url); // Fetch properties for the clicked page
      }
    } else {
      if (url) {
        url += `&location=${selectedLocation}&property_type=${selectedType}`;
        fetchProperties(url); // Fetch properties for the clicked page
      }
        fetchProperties(url);
    }
  });
});
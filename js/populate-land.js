$(document).ready(function() {
  // Function to extract URL parameters
  function getParameterByName(name) {
      name = name.replace(/[\[\]]/g, '\\$&');
      let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(window.location.href);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Get the land_id from the URL
  let landId = getParameterByName('land_id');

  if (landId) {
      // Make the API call
      $.ajax({
          url: `http://localhost:8000/api/land/view?land_id=${landId}`,
          method: 'GET',
          success: function(response, status, xhr) {
              if (xhr.status === 200) {
                  // Assuming the API response is a JSON object with the required fields
                  let land = response;

                  // Build the HTML for the land view
                  let landHtml = `
                      <div class="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                          <div class="property-item rounded overflow-hidden">
                              <div class="position-relative text-center overflow-hidden">
                                  <img id="main_image" class="img-fluid" src="img/property-2.jpg" alt="">
                              </div>
                              <div id="secondary_image_container" class="row g-4 justify-content-center text-center py-2 my-2">`;

                  // Add secondary images
                  // Check if land_images array exists in the response
                  if (land.land_images && land.land_images.length > 0) {
                      land.land_images.forEach(function(image) {
                          landHtml += `
                              <div class="col-lg-2 col-md-2">
                                  <img class="img-fluid" src="img/property-2.jpg" alt="">
                              </div>`;
                      });
                  } else {
                      landHtml += `<p>No secondary images available.</p>`;
                  }

                  landHtml += `
                              </div>
                              <div class="p-4 pb-0">
                                  <h5 class="text-primary mb-3">${land.price}</h5>
                                  <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${land.location}</p>
                                  <p>${land.description}</p>
                              </div>
                          </div>
                      </div>
                  `;

                  // Insert the HTML into the #land_view div
                  $('#land_view').html(landHtml);
                  $('#land_title').html(land.title);
                  $('#land_title_crumb').html(land.title);
                  $('#land_title_inner').html(land.title);
                  $('#land_description').html(land.description);
              }
          },
          error: function(xhr, status, error) {
              console.error('Error fetching land data:', error);
              $('#land_view').html('<p>Error loading land details. Please try again later.</p>');
              $('#land_title').html('Land Not Found');
              $('#land_title_crumb').html('Land Not Found');
          }
      });
  } else {
      $('#land_view').html('<p>No land ID found in the URL.</p>');
      $('#land_title').html('Land Not Found');
      $('#land_title_crumb').html('Land Not Found');
  }
});
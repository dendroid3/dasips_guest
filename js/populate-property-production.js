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

  // Get the property_id from the URL
  let propertyId = getParameterByName('property_id');

  if (propertyId) {
      // Make the API call
      $.ajax({
          url: `http://localhost:8000/api/properties/view?property_id=${propertyId}`,
          method: 'GET',
          success: function(response, status, xhr) {
              if (xhr.status === 200) {
                  // Assuming the API response is a JSON object with the required fields
                  let property = response;

                  // Build the HTML for the property view
                  let propertyHtml = `
                      <div class="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                          <div class="property-item rounded overflow-hidden">
                              <div class="position-relative text-center overflow-hidden">
                                  <img id="main_image" class="img-fluid" src="${property.image_url}" alt="">
                              </div>
                              <div id="secondary_image_container" class="row g-4 justify-content-center text-center py-2 my-2">`;

                  // Add secondary images
                  // Check if property_images array exists in the response
                  if (property.property_images && property.property_images.length > 0) {
                      property.property_images.forEach(function(image) {
                          propertyHtml += `
                              <div class="col-lg-2 col-md-2">
                                  <img class="img-fluid" src="${image.image_url}" alt="">
                              </div>`;
                      });
                  } else {
                      propertyHtml += `<p>No secondary images available.</p>`;
                  }

                  propertyHtml += `
                              </div>
                              <div class="p-4 pb-0">
                                  <h5 class="text-primary mb-3">${property.price}</h5>
                                  <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${property.location}</p>
                              </div>
                              <div class="d-flex border-top">
                                  <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>${property.bedrooms} Bed</small>
                                  <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>${property.bathrooms} Bath</small>
                              </div>
                          </div>
                      </div>
                  `;

                  // Insert the HTML into the #property_view div
                  $('#property_view').html(propertyHtml);
                  $('#property_title').html(property.title);
                  $('#property_title_crumb').html(property.title);
                  $('#property_title_inner').html(property.title);
                  $('#property_description').html(property.description);
              }
          },
          error: function(xhr, status, error) {
              console.error('Error fetching property data:', error);
              $('#property_view').html('<p>Error loading property details. Please try again later.</p>');
              $('#property_title').html('Property Not Found');
              $('#property_title_crumb').html('Property Not Found');
          }
      });
  } else {
      $('#property_view').html('<p>No property ID found in the URL.</p>');
      $('#property_title').html('Property Not Found');
      $('#property_title_crumb').html('Property Not Found');
  }
});
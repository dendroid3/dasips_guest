$(document).ready(function() {
  // Fetch data from the API
  $.ajax({
      url: 'http://localhost:8000/api/properties/types_and_locations',
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
});
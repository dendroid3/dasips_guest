// script.js
$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createCompleteProject(title, location, description, serviceName, imageUrl) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <div class="d-flex justify-content-center"><img class="img-fluid" src="${imageUrl}" alt=""></div>
            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${serviceName}</div>
          </div>
          <div class="p-4 pb-0">
            <a class="d-block h5 mb-2" href="">${title}</a>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${location}</p>
            <p class="my-0">${description}</p>
          </div>
        </div>
      </div>
    `;
  }

  function fetchCompletedProjects() {
    $.ajax({
      url: 'http://localhost:8000/api/projects/get',
      method: 'GET',
      success: function(data) {
        data.data.forEach(function(project) {
          $("#completed_projects_list").append(
            createCompleteProject(
              project.name,
              project.location,
              project.description,
              project.type,
              'http://localhost:8000' + project.image_url
            )
          );
          console.log('http://localhost:8000' + project.imageUrl);
        });
      },
      error: function(error) {
        console.error('Error fetching completed projects:', error);
      }
    });
  }

  fetchCompletedProjects();
});
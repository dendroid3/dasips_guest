// script.js
$(document).ready(function() {
  // Define a function to create the div HTML with dynamic content
  function createCompleteProject(title, address, description, serviceName, imageUrl) {
    return `
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="property-item rounded overflow-hidden">
          <div class="position-relative overflow-hidden">
            <a href=""><img class="img-fluid" src="${imageUrl}" alt=""></a>
            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${serviceName}</div>
          </div>
          <div class="p-4 pb-0">
            <a class="d-block h5 mb-2" href="">${title}</a>
            <p class="my-0"><i class="fa fa-circle text-primary me-2"></i>${address}</p>
            <p class="my-0">${description}</p>
          </div>
          <div class="col-12 text-center mb-4" data-wow-delay="0.1s">
            <a class="btn btn-primary py-0 px-3" href="">View</a>
          </div>
        </div>
      </div>
    `;
  }

  // Append two different property items
  $("#completed_projects_list")
    .append(createCompleteProject("Project XY", "123 Street, New York, USA", "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet", "Service 1", "img/property-1.jpg"))
    .append(createCompleteProject("Project ZA", "526 Boulevard, Texas, USA", "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet", "Service 2", "img/property-2.jpg"))
    .append(createCompleteProject("Project AB", "456 Avenue, Los Angeles, USA", "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet", "Service 3", "img/property-3.jpg"));
});
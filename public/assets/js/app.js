// // tester button click to check connection
$(document).on("click", ".btn", function(){
    alert("correctly linked yo")
    console.log("correctly linked yoskiiii")
})

$(document).on("click", "#saved", function(){
    // alert("correctly linked yo")
    console.log("correctly linked yoskiiii")
})

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
    //   $("#cardholder").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    //   $("#cardholder").append("<p> Title: " + data[i].title + "</p>")
    //   $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> </div>")
      $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> <div class='card-body'> <h5 class='card-title'>" + data[i].preview + "</h5> <p class='card-text'>" + data[i].link + "</p> <a href='#' id='save-article' class='btn btn-primary'>Save Article</a> </div> </div>")
    }
    console.log(data);
  });
  
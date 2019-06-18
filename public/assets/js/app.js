
// // tester button click to check connection
$(document).on("click", "#delete-article", function () {
  // alert("correctly linked yo")
  console.log("correctly linked yoskiiii")
  var thisId = $(this).attr("data-id");
  // var thisId = "5d03dd00bcf25da1f292e791"
  // console.log("this = " + JSON.stringify($(this)))
  console.log("thisId = " + thisId)
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/savedArticles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log("data: " + JSON.stringify(data));
        
        $.ajax({
          method: "POST",
          url: "/savedArticles/" + thisId,
          data: {
            // title: data.title,
            saved: false
          }
        })
        // console.log("posted")
        location.reload();
      });
})

$(document).on("click", "#save-article", function () {
  // alert("correctly linked yo")
  // console.log("saved button correctly linked yoskiiii")
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // var thisId = "5d03dd00bcf25da1f292e791"
  // console.log("this = " + JSON.stringify($(this)))
  console.log("thisId = " + thisId)
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log("data: " + JSON.stringify(data));
        
        $.ajax({
          method: "POST",
          url: "/articles/" + thisId,
          data: {
            // title: data.title,
            saved: true
          }
        }) 
        console.log("posted")
        location.reload();
      });
})

$(document).on("click", "#article-notes", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log("data.note =" + data.note)
      console.log("data: " + data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/savedArticles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// $(document).on("click", "#save-article", function () {
//   // alert("correctly linked yo")
//   // console.log("saved button correctly linked yoskiiii")
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");
//   // var thisId = "5d03dd00bcf25da1f292e791"
//   // console.log("this = " + JSON.stringify($(this)))
//   console.log("thisId = " + thisId)
//     // Now make an ajax call for the Article
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         saved: true
//       }
//     })
//       // With that done, add the note information to the page
//       .then(function(data) {
//         console.log("data: " + JSON.stringify(data));
//         // $.ajax({
//         //   method: "POST",
//         //   url: "/savedArticles",
//         //   data: data,
//         //   dataType: 'json'
//         // })
//       });
// })

// Grab the articles as a json
// $.getJSON("/articles", function (data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     //   $("#cardholder").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     //   $("#cardholder").append("<p> Title: " + data[i].title + "</p>")
//     //   $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> </div>")
//     $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> <div class='card-body'> <h5 class='card-title'>" + data[i].preview + "</h5> <p class='card-text'>" + data[i].link + "</p> <a href='#' id='save-article' class='btn btn-primary'>Save Article</a> </div> </div>")
//   }
//   console.log(data);
// });

$(document).on("click", "#clear", function () {
  alert("correctly linked yo")
  console.log("correctly linked yoskiiii")
  // e.preventDefault();
  
  $.ajax({
    method: "GET",
    url: "/articles"
  }).then(function(data){
    // console.log("data: " + data);
    console.log("data: " + JSON.stringify(data));
        
    $.ajax({
      method: "DELETE",
      url: "/articles",
      // data: {
      //   // title: data.title,
      //   saved: true
      // }
    }) 
    console.log("posted")
    location.reload();
  });
  
})

// on scrape click
$(document).on("click", "#scrape", function () {
  // e.preventDefault();

  // var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/scrape/"
  }).then(function(){
    $.getJSON("/articles", function(data) {
      location.reload();
    });
  });
  // console.log("This ID: " + thisId);
 
})

// $(document).on("click", "#saved", function () {
//   $.ajax({
//     method: "GET",
//     url: "/saved"
//   }).then(function(data){
//     console.log("data: " + data)
//     $.getJSON("/articles", function(data) {
//       location.reload();
//     });
//   });
//   // console.log("This ID: " + thisId);
  
// })
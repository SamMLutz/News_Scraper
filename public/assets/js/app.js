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
      url: "/articles/" + thisId
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
      url: "/savedArticles/" + thisId
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
        // console.log("posted")
        location.reload();
      });
})

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

// $(document).on("click", "#clear", function () {
//   // alert("correctly linked yo")
//   // console.log("correctly linked yoskiiii")
//   $.ajax({
//     method: "GET",
//     url: "/articles"
//   }).then(function (data) {
//     if (data) {
//       db.Article.remove();
//     }
//   })
// })

// on scrape click
$(document).on("click", "#scrape", function () {
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      //   $("#cardholder").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      //   $("#cardholder").append("<p> Title: " + data[i].title + "</p>")
      //   $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> </div>")
      // $("#cardholder").append("<div class='card'> <div class='card-header'>" + data[i].title + "</div> <div class='card-body'> <h5 class='card-title'>" + data[i].preview + "</h5> <p class='card-text'>" + data[i].link + "</p> <a href='#' id='save-article' class='btn btn-primary' data-id=" + data[i].id + ">Save Article</a> </div> </div>")
    }
    console.log(data);
  });
  // alert("correctly linked yo")
  // console.log("correctly linked yoskiiii")
  // $.ajax({
  //   method: "GET",
  //   url: "/articles"
  // }).then(function (data) {
  //   if (data) {
      
  //   }
  // })

})
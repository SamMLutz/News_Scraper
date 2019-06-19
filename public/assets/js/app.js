// delete article button
$(document).on("click", "#delete-article", function () {
  // alert("correctly linked yo")
  console.log("correctly linked yoskiiii")
  var thisId = $(this).attr("data-id");
  // console.log("this = " + JSON.stringify($(this)))
  console.log("thisId = " + thisId)
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/savedArticles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log("data: " + JSON.stringify(data));
      $.ajax({
        method: "POST",
        url: "/savedArticles/" + thisId,
        data: {
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
  // console.log("this = " + JSON.stringify($(this)))
  console.log("thisId = " + thisId)
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
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

// article notes button
$(document).on("click", "#article-notes", function () {
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
    .then(function (data) {
      console.log("data.note =" + data.note)
      console.log("data: " + data);
      // The title of the article
      $("#notes").append("Article:  <h5>" + data.title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' placeholder='Note Title' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='delete-note'>Delete Note</button>");
      // $("#notes").append("<button data-id='" + data._id + "' id='new-note'>Add a New Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val("Note Title: " + data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val("Article Note: " + data.note.body);
      }
    });
});

$(document).on("click", "#delete-note", function () {
  // console.log("correctly linked yoskiiii")
  // e.preventDefault();
  $.ajax({
    method: "GET",
    url: "/notes"
  }).then(function (data) {
    // console.log("data: " + data);
    // var thisId = $(this).attr("data-id");
    var thisId = data[0]._id;
    console.log("data: " + JSON.stringify(data));
    console.log("this: " + JSON.stringify($(this)))
    console.log("thisID: " + thisId)
    console.log("data id = " + data[0]._id)
    $.ajax({
      method: "DELETE",
      url: "/notes/" + thisId
    })
    console.log("posted")
    location.reload();
  });

})

// When you click the savenote button
$(document).on("click", "#savenote", function () {
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
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#clear", function () {
  alert("correctly linked yo")
  console.log("correctly linked yoskiiii")
  // e.preventDefault();
  $.ajax({
    method: "GET",
    url: "/articles"
  }).then(function (data) {
    // console.log("data: " + data);
    console.log("data: " + JSON.stringify(data));

    $.ajax({
      method: "DELETE",
      url: "/articles"
    })
    console.log("posted")
    location.reload();
  });
})

// on scrape click
$(document).on("click", "#scrape", function () {

  $.ajax({
    method: "GET",
    url: "/scrape/"
  }).then(function () {
    $.getJSON("/articles", function (data) {
      location.reload();
    });
  });
  // console.log("This ID: " + thisId);
})


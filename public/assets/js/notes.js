const $noteTitle = $("#newNoteTitle");
const $noteText = $("#newNoteText");
const $saveNoteBtn = $("#saveNote");
const $noteList = $(".list-container .list-group");
var note = $(this)
    .parents(".list-group-item")
    .data();

var addNewNoteUpdate = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  $.ajax({
    url: "/api/notes",
    data: newNote,
    method: "POST"
  }).then(function(data) {
    location.reload();
  });
};

var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var noteitem = notes[i];

    var $li = $("<li class='list-group-item'>").data(noteitem);
    var $titleDiv = $("<div>");
    var $titleSpan = $("<span class='font-weight-bold'>").text(noteitem.title);
 
    var $noteP = $("<p class='mt-2'>").text(noteitem.text);

    $titleDiv.append($titleSpan)
              .append(`<button class='fas fa-trash-alt float-right text-danger delete-note' data-id=${noteitem.id}></button>`);

    $li.append($titleDiv, $noteP);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", addNewNoteUpdate);

$(document).on("click", ".delete-note", function(event) {
  event.stopPropagation;
  const noteId = $(this).attr("data-id");
  $.ajax({
    url: `/api/notes/${noteId}`,
    method: "DELETE"
    }).then(function(data) {
    location.reload();
    });

})

getAndRenderNotes();

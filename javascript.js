var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);
function addToDoItem() {
 var itemText = toDoEntryBox.value;
 newToDoItem(itemText, false);
}
var clearButton = document.getElementById("clear-completed-button");
clearButton.addEventListener("click",clearCompletedToDoItems);
function clearCompletedToDoItems(){
  var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}
var EmptyList = document.getElementById("empty-button");
EmptyList.addEventListener("click",emptyList);
function emptyList(){
  var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);
function saveList(){
  var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed){
  var toDoItem = document.createElement("li");
  var toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);
  if (completed){
    toDoItem.classList.add("completed");
  }
  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener("dblclick", toggleToDoItemState);
}



function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}
function loadList() {
    if (localStorage.getItem("toDos") !== null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList();

'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const stickyArea = document.querySelector(
    '#stickies-container'
  );

  const createStickyButton = document.querySelector(
    '#createsticky'
  );

  const stickyTitleInput = document.querySelector('#stickytitle');
  const stickyTextInput = document.querySelector('#stickytext');

  const deleteSticky = e => {
    e.target.parentNode.remove();
  };

  let isDragging = false;
  let dragTarget;

  let lastOffsetX = 0;
  let lastOffsetY = 0;

  function drag(e) {
    if (!isDragging) return;

    // console.log(lastOffsetX);

    dragTarget.style.left = e.clientX - lastOffsetX + 'px';
    dragTarget.style.top = e.clientY - lastOffsetY + 'px';
  }

  function createSticky() {
    const newSticky = document.createElement('div');
    const html = `<h3>${stickyTitleInput.value.replace(
      /<\/?[^>]+(>|$)/g,
      ''
    )}</h3><p>${stickyTextInput.value
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(
      /\r\n|\r|\n/g,
      '<br />'
    )}</p><span class="deletesticky">&times;</span>`;
    newSticky.classList.add('drag', 'sticky');
    newSticky.innerHTML = html;
    // newSticky.style.backgroundColor = randomColor();
    stickyArea.append(newSticky);
    positionSticky(newSticky);
    applyDeleteListener();
    clearStickyForm();
  }
  function clearStickyForm() {
    stickyTitleInput.value = '';
    stickyTextInput.value = '';
  }
  function positionSticky(sticky) {
    sticky.style.left =
      window.innerWidth / 2 -
      sticky.clientWidth / 2 +
      (-100 + Math.round(Math.random() * 50)) +
      'px';
    sticky.style.top =
      window.innerHeight / 2 -
      sticky.clientHeight / 2 +
      (-100 + Math.round(Math.random() * 50)) +
      'px';
  }

  function editSticky() {}

  function stripHtml(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }

  function randomColor() {
    const r = 200 + Math.floor(Math.random() * 56);
    const g = 200 + Math.floor(Math.random() * 56);
    const b = 200 + Math.floor(Math.random() * 56);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function applyDeleteListener() {
    let deleteStickyButtons = document.querySelectorAll(
      '.deletesticky'
    );
    deleteStickyButtons.forEach(dsb => {
      dsb.removeEventListener('click', deleteSticky, false);
      dsb.addEventListener('click', deleteSticky);
    });
  }

  window.addEventListener('mousedown', e => {
    if (!e.target.classList.contains('drag')) {
      return;
    }
    dragTarget = e.target;
    dragTarget.parentNode.append(dragTarget);
    lastOffsetX = e.offsetX;
    lastOffsetY = e.offsetY;
    // console.log(lastOffsetX, lastOffsetY);
    isDragging = true;
  });
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', () => (isDragging = false));

  createStickyButton.addEventListener('click', createSticky);
  applyDeleteListener();
});
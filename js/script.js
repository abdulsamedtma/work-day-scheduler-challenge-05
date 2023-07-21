// Psuedo code to build a work day scheduler to meet all the given acceptance criteria:

// 1. The current day date and time will be displayed at the top of the calendar.
// 2.  The time blocks for standard business hours (9am to 5pm) will be presented as you scroll down.
// 3.  Each time block will be color-coded based on whether it is in the past, present, or future time.
// 4.  You can click into a time block to enter an event.
// 5.  Clicking the save button for a time block will save the event text to local storage.
// 6.  Even after refreshing the page, the saved events will persist due to local storage usage.



$(document).ready(function () {
  // Function to display the current date at the top of the calendar
  function displayCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
    $("#currentDay").text(currentDate);
  }

  // Function to generate time blocks for standard business hours
  function generateTimeBlocks() {
    const startTime = 9;
    const endTime = 17; // 5pm in 24-hour format

    for (let hour = startTime; hour <= endTime; hour++) {
      const timeBlock = $("<div>").addClass("row time-block");
      const hourText = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(`${hour}AM`);
      const eventTextarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3).attr("data-hour", hour);
      const saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlock.append(hourText, eventTextarea, saveButton);
      $("#timeBlocks").append(timeBlock);
    }
  };

  // Function to color-code the time blocks based on their past, present, or future status
  function colorCodeTimeBlocks() {
    // Get the current hour of the day using dayjs().hour()
    const currentTime = dayjs().hour();
    // Iterate over each time block
    $(".time-block").each(function () {
      // Deduced the hour value from the text of the .hour element and convert it to an integer
      const blockHour = parseInt($(this).find(".hour").text());
      // Using thr if statement to compare the house value(blockHour) with the current hour (currentTime)
      // to determine whether it's in the past, present, or future.
      if (blockHour < currentTime) {
        // Add the class "past" to the time block if it's in the past
        $(this).addClass("past");
      } else if (blockHour === currentTime) {
        // Add the class "present" to the time block if it's the current hour
        $(this).addClass("present");
      } else {
        // Add the class "future" to the time block if it's in the future
        $(this).addClass("future");
      }
    });
  }

  // Function to load saved events from local storage
  function loadSavedEvents() {
    // Iterate over each time block
    $(".time-block").each(function () {
      // Get the hour value from the text of the .hour element
      const hour = $(this).find(".hour").text();
      // fetch the saved event text from local storage for the current hour
      const savedEvent = localStorage.getItem(hour);
      // Check if there is a saved event for the current hour
      if (savedEvent) {
        // If a saved event exists, set its value as the text inside the corresponding .description textarea
        $(this).find(".description").val(savedEvent);
      }

    });
  }

  // Function to save events to local storage when the save button is clicked
  function saveEvent() {
    // Get the hour value from the text of the .hour element
    const hour = $(this).siblings(".hour").text();
    // Get the event text from the .description textarea
    const eventText = $(this).siblings(".description").val();
    // Save the event text to local storage using the hour as the key
    localStorage.setItem(hour, eventText);
  }

  // Event listener for the save button
  $(".saveBtn").on("click", saveEvent);

  // Call functions to initialize the app
  displayCurrentDate();
  generateTimeBlocks();
  colorCodeTimeBlocks();
  loadSavedEvents();


});






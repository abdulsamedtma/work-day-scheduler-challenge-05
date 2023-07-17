
// This event listener waits for the HTML document to be fully loaded before executing the code inside the callback function.
document.addEventListener('DOMContentLoaded', function () {
  const currentDayEl = document.getElementById('currentDay'); // Retrieves the element with the id 'currentDay' and assigns it to the currentDayEl variable.
  const timeBlocks = document.querySelectorAll('.description'); // Retrieves all the elements with the class 'description' and assigns them to the timeBlocks variable as a NodeList
  const saveButtons = document.querySelectorAll('.saveBtn');   // Retrieves all the elements with the class 'saveBtn' and assigns them to the saveButtons variable as a NodeList

  // Display the current day of the week and date
  const currentDay = dayjs().format('dddd MMMM D, YYYY, h:mm:ss a');// Retrieves the current date and time using the Day.js library and formats it as 'DayOfWeek Month Day, Year, Hour:Minute:Second AM/PM'. The result is stored in the currentDay variable.
  currentDayEl.textContent = currentDay; // Sets the text content of the currentDayEl element to the value of the currentDay variable. This updates the displayed current date and time in the user interface.

  // Function to update timeblock colors based on the current time
  function updateBlockColors() { // The updateBlockColors function is defined to update the colors of time blocks based on the current hour.
    const currentHour = dayjs().hour(); //It starts by obtaining the current hour in 24-hour format using dayjs().hour(), which is stored in the currentHour variable.
    timeBlocks.forEach(function (block) { //The function then iterates over each time block using the forEach method on the timeBlocks array.
      const blockHour = parseInt(block.getAttribute("id")); //Within the loop, the blockHour variable is assigned the hour value of the current time block. This is obtained by parsing the id attribute of the block element as an integer using parseInt(block.getAttribute("id")).
      // Apply class based on the relation of blockHour to currentHour
      //Using condition al statemens:
      if (blockHour < currentHour) { // If the blockHour is less than the currentHour, it means the block represents a past hour. 
        block.classList.add('past'); // The 'past' class is added to the block's classList using block.classList.add('past')
      } else if (blockHour === currentHour) { // Else if the blockHour is same as the currentTime.       
        block.classList.add('present'); // The 'present' class is added using 'block.classList('present') 
      } else { // If neither of the above conditions is met, it means the block represents a future hour
        block.classList.remove('past'); // The 'past' classes are removed from the block's classList using block.classList.remove('past')  
        block.classList.remove('present'); // As well as the 'present' using the block.classList.remove('present'), respectively.
        block.classList.add('future'); // Then, the 'future' class is added using block.classList.add('future')
      } // In summary,The code applies different classes to the time blocks based on their relation to the current hour.
      //  By adding or removing classes, the CSS styles associated with those classes will be applied, updating the colors or visual representation of the time blocks accordingly.
    });
  };

  // Load saved events from local storage
  //This code uses jQuery to perform certain actions when the save button with the class .saveBtn is clicked. 
  // It also interacts with the browser's localStorage feature. 
  // Here's a breakdown:
  $(".saveBtn").on("click", function () { //$(".saveBtn").on("click", function () { ... }): This sets up a click event listener for any HTML element with the class saveBtn. When one of these elements is clicked, the code inside the function is executed.
    console.log($(this).siblings("textArea").val()); // '$(this).siblings("textArea").val()': This line retrieves the value of the textarea element that is a sibling of the clicked save button. $(this) refers to the specific save button that was clicked, siblings("textArea") selects the sibling textarea element, and .val() retrieves its value. The value is then logged to the console.
    var textAreavalue = ($(this).siblings("textArea").val()); //var textAreavalue = ($(this).siblings("textArea").val());: This line stores the retrieved value of the textarea element in the textAreavalue variable.
    var textAreaTime = ($(this).siblings("textArea").attr("id")); //var textAreaTime = ($(this).siblings("textArea").attr("id"));: This line retrieves the id attribute of the sibling textarea element and assigns it to the textAreaTime variable. It represents the time associated with the textarea
    localStorage.setItem(textAreaTime, textAreavalue); //localStorage.setItem(textAreaTime, textAreavalue);: This line stores the value of the textarea in the browser's localStorage, using the textAreaTime as the key and textAreavalue as the value. 
  }); //This allows the data to persist even after the page is refreshed or closed.
  //The for loop iterates over each item in the localStorage. 
  for (var i = 0; i < localStorage.length; i++) {
    // It retrieves the key using localStorage.key(i) and the corresponding value using localStorage.getItem(key). These values can be further processed or used in subsequent code.
    var key = localStorage.key(i);

    var value = localStorage.getItem(key);

    //Retrieve information from local storage
    $("textArea#" + key).val(value)
  };


  // Call functions to initialize the scheduler
  updateBlockColors();
  // loadEvents();
});

// Call the loadEvents function to load any previously saved events
loadEvents();

// Call the updateTimeBlocks function to set initial time block colors
updateTimeBlocks();

// Update time block colors every minute
setInterval(updateTimeBlocks, 60000);







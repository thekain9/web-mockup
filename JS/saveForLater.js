
//--------------SLIDES FUNCTIONALITY---------------------------------------

let slideIndex = 1                                                          // Variable to keep track of the current slide index, initialised to one so the first slide is shown.
showSlides(slideIndex);

// Next/Previous controls
function plusSlides(n) {                                                    // Function to move to the next or previous slide based on the value of 'n'.
  showSlides(slideIndex += n);
}




function showSlides(n) {                                                    // Function to display the slide with the index 'n' and update the dots accordingly.
    let i;                                                                  // Declaration of a variable 'i' to be used in the loop for iterating over slides and dots.
    let slides = document.getElementsByClassName("slideshow-container");    // Get all elements with the class "slideshow-container" and store them in the 'slides' variable.
    let dots = document.getElementsByClassName("dot");                      // Get all elements with the class "dot" and store them in the 'dots' variable.
  
    if (n > slides.length) {                                                // If the provided index 'n' is greater than the total number of slides:
        slideIndex = 1;                                                     // Set the 'slideIndex' to the first slide (1) to display the first slide.
    } else if (n < 1) {                                                     // If the provided index 'n' is less than 1:
        slideIndex = slides.length;                                         // Set the 'slideIndex' to the last slide to display the last slide.
    }
  
    for (i = 0; i < slides.length; i++) {                                   // Loop through all slides using the variable 'i'.
      slides[i].style.display = "none";                                     // Hide each slide by setting its display property to "none".
    }
  
    for (i = 0; i < dots.length; i++) {                                     // Loop through all dots using the variable 'i'.
      dots[i].className = dots[i].className.replace(" active", "");         // Remove the "active" class from each dot by replacing it with an empty string.
    }
  
    slides[slideIndex-1].style.display = "block";                           // Display the current slide by setting its display property to "block".
  
    dots[slideIndex-1].className += " active";                              // Add the "active" class to the dot corresponding to the current slide to indicate it as active, the dot should be of a different colour when the matching slide index is selected. 
}
  


//--------------SAVE FOR LATER FUNCTIONALITY--------------------------------------


//Function to store the images as array elements so the program can alert a message of the amount of images saved.

let images = [];                                                            // Declare an empty array 'images' to store saved images.

function saveForLater(button, slideIndex) {
    const image1 = document.getElementById('1');
    const image2 = document.getElementById('2'); 
    const image3 = document.getElementById('3');
    const image4 = document.getElementById('4');                            // Get all elements with the class "mySlides" and store them in the 'slides' variable.
                                                                            // Get the specific slide element based on the provided 'slideIndex'.

    let savedImages = [];                                                   // Declare an empty array 'savedImages' to store the images saved in localStorage.

    
    if (localStorage.getItem("hasBeenSaved") === null) {                  // Check if "hasBeenSaved" key exists in localStorage.
        
        // If not, store the current 'images' array in localStorage as a string and set "hasBeenSaved" to true.
        localStorage.setItem("savedImage", JSON.stringify(images));
        localStorage.setItem("hasBeenSaved", true);
    } else {
        // If "hasBeenSaved" exists, retrieve the saved images from localStorage and parse them into the 'savedImages' array.
        savedImages = JSON.parse(localStorage.getItem('savedImage'));
    }

    if(slideIndex == 1) {
        images.push(image1.outerHTML); 
    } else if (slideIndex == 2) {
        images.push(image2.outerHTML);   
    } else if (slideIndex == 3) {
        images.push(image3.outerHTML)
    } else if (slideIndex == 4) {
        images.push(image4.outerHtml)
    }
                                             
    
    localStorage.setItem("savedImages", JSON.stringify(images));          // Update the session storage with the new 'images' array as a string.

    
    const total = images.length;
    alert(`There are ${total} images saved so far...`);                     // Display an alert with the total number of saved images so far.
}




function displaySavedImages() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')); // Retrieve the saved images from localStorage and parse them into the 'savedImages' array.

    
    if (!savedImages || savedImages.length === 0) {                        // Check if there are saved images.
        return;                                                            // If no saved images found, exit the function.
    }

    const container = document.getElementById('saved-images-container');   // Get the element with the ID 'saved-images-container' and store it in the 'container' variable.

    
    savedImages.forEach((imageHtml) => {                                    // Loop through the saved images and create div elements to display each saved image.
        const div = document.createElement('div');                          // Create a div element for each saved image.
        div.innerHTML = imageHtml;                                          // Set the innerHTML of the div to the HTML content of the saved image.
        container.appendChild(div);                                         // Append the div element to the 'container' to display the saved image.
    });
}


document.addEventListener('DOMContentLoaded', displaySavedImages);          // Call the 'displaySavedImages' function when the page loads.


//--------------LEAVE COMMENT FUNCTIONALITY--------------------------------------

let myComment = [];                                                       // Declare an empty array to store comments.

function leaveComment(button) {                                           // Function to handle leaving a comment on a button click.
    const input = button.previousElementSibling;                          // Get the input element preceding the button (assuming it's an input field for the comment).
    const commentText = input.value;                                      // Get the text content of the input field.

    if (commentText.trim() === "") {                                      // Check if the comment is empty or contains only whitespace.
        alert("Please enter a comment before submitting!");               // Display an alert if the comment is empty and return (do nothing).
        return;
    }

    // Create the comment paragraph
    const createComment = document.createElement('p');                   // Create a new 'p' element to hold the comment.
    createComment.textContent = commentText;                             // Set the text content of the 'p' element to the comment text.
    createComment.classList.add('comment-text');                         // Add the CSS class "comment-text" to the 'p' element.

    
    const saveLaterRow = input.parentElement;                            // Get the parent element that contains the input and button name "save-later".

    
    saveLaterRow.appendChild(createComment);                             // Add the comment 'p' element as a child to the parent element to the save-later row.

    // Save the comment to localStorage
    if (localStorage.getItem('hasCommented') === null) {               // Check if there are no comments saved in the localStorage.
        localStorage.setItem('commentAdded', JSON.stringify(myComment));  // Save the initial empty array to the localStorage.
        localStorage.setItem('hasCommented', true);                    // Save a flag to indicate that comments have been added.
    } else {
        myComment = JSON.parse(localStorage.getItem('commentAdded'));   // If comments exist, retrieve the array from localStorage and store it in 'myComment'.
    }
    myComment.push(commentText);                                         // Add the new comment to the 'myComment' array.
    localStorage.setItem('commentAdded', JSON.stringify(myComment));   // Save the updated 'myComment' array to localStorage.

    input.value = "";                                                     // Clear the input field after leaving the comment.
}


//--------------LEAVE COMMENT FUNCTIONALITY--------------------------------------


function likeSlide(button) {                                              // Function to handle liking a slide by clicking the like button.
    // Toggle the "liked" class on the button when clicked
    button.classList.toggle('liked');                                    // Toggle the "liked" class on the button element (switch between adding and removing the class).

    // Change the text of the button based on its current state
    if (button.classList.contains('liked')) {                            // Check if the button has the "liked" class after the toggle.
        button.textContent = 'Liked';                                    // Change the text content of the button to 'Liked' when it is liked.
        // Save the like state to localStorage
        const slideIndex = button.getAttribute('data-slide-index');      // Get the slide index from the "data-slide-index" attribute of the button.
        localStorage.setItem(`slide${slideIndex}_liked`, 'true');      // Save the liked state for the corresponding slide in localStorage.
    } else {
        button.textContent = 'Like';                                     // Change the text content of the button back to 'Like' when it is unliked.
        // Remove the like state from localStorage
        const slideIndex = button.getAttribute('data-slide-index');      // Get the slide index from the "data-slide-index" attribute of the button.
        localStorage.removeItem(`slide${slideIndex}_liked`);          // Remove the liked state for the corresponding slide from localStorage.
    }
}








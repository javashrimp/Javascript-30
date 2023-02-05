// Wrap JS code in an IIFE, creating a closure so as to not pollute the global namespace
(() => {

    // Declare variable that will be defined later as the input that the user
    // most recently selected
    let lastSelected;

    // Declare & define constant as a reference to all inputs of type checkbox
    // that are children of the 'inbox' class
    const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');

    // Event Handler function
    const multiCheck = (el, e) => {

      // If the lastSelected variable is defined and the shift key was pressed
      // when this event triggered...
      if (lastSelected && e.shiftKey) {

        // Set checked property of checkbox to be the same as the
        // checked property of the last selected input
        el.checked = lastSelected.checked;

        // If the ID of the checkbox is greater than the ID of the last selected input...
        const [startIdx, endIdx] = el.id > lastSelected.id ?
          // ...define variable startIdx as last selected input ID and endIdx as checkbox ID
          [lastSelected.id, el.id] :
          // ...if not, switch variable definitions
          [el.id, lastSelected.id];

        // Declare & define constant as an array of inputs between the last selected input
        // and the checkbox input
        const middleInputs = [...checkBoxes].slice(parseInt(startIdx) + 1, endIdx);

        // Set checked property of each input to match checked property of checkbox input
        middleInputs.forEach(checkbox => checkbox.checked = el.checked);
      }

      // If no lastSelected or shiftKey was not pressed, entire if statement is skipped
      // Define lastSelected as the input that was the checked which triggered the event handler
      lastSelected = el;
    }

    // Add event listener to each input that will call multiCheck function on the 'click' event
    checkBoxes.forEach(checkBox => {
      checkBox.addEventListener('click', multiCheck.bind(null, checkBox));
    });
  })();
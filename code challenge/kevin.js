// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the DOM elements
  const addButton = document.getElementById("addButton");
  const itemInput = document.getElementById("itemInput");
  const itemList = document.getElementById("itemList");
  const markPurchasedButton = document.getElementById("markPurchasedButton");
  const clearListButton = document.getElementById("clearListButton");

  // Initialize the items array from localStorage or set it to an empty array
  let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

  // Function to render the shopping list items
  const renderList = () => {
    // Clear the existing items in the list
    itemList.innerHTML = "";
    // Iterate over each item in the items array
    items.forEach((item, index) => {
      // Create a new list item (li) element
      const li = document.createElement("li");
      // Set the text content of the list item to the item's text
      li.textContent = item.text;
      // Add the 'purchased' class if the item is marked as purchased
      li.classList.toggle("purchased", item.purchased);
      // Set a data attribute to keep track of the item's index
      li.dataset.index = index;
      // Append the list item to the item list
      itemList.appendChild(li);
    });
  };

  // Function to save the current list of items to localStorage
  const saveList = () => {
    // Convert the items array to a JSON string and save it to localStorage
    localStorage.setItem("shoppingList", JSON.stringify(items));
  };

  // Event listener for the "Add" button
  addButton.addEventListener("click", () => {
    // Get the trimmed value from the input field
    const itemText = itemInput.value.trim();
    // Check if the input is not empty
    if (itemText !== "") {
      // Add the new item to the items array
      items.push({ text: itemText, purchased: false });
      // Save the updated list to localStorage
      saveList();
      // Render the updated list
      renderList();
      // Clear the input field and focus on it for the next entry
      itemInput.value = "";
      itemInput.focus();
    }
  });

  // Event listener for the list to handle item clicks
  itemList.addEventListener("click", (event) => {
    // Check if the clicked element is an <li> item
    if (event.target.tagName === "LI") {
      // Get the index of the clicked item from the data attribute
      const index = event.target.dataset.index;
      // Toggle the purchased status of the item
      items[index].purchased = !items[index].purchased;
      // Save the updated list to localStorage
      saveList();
      // Render the updated list
      renderList();
    }
  });

  // Event listener for the "Mark Purchased" button
  markPurchasedButton.addEventListener("click", () => {
    // Toggle the purchased status for all items in the list
    items.forEach((item) => {
      item.purchased = !item.purchased;
    });
    // Save the updated list to localStorage
    saveList();
    // Render the updated list
    renderList();
  });

  // Event listener for the "Clear List" button
  clearListButton.addEventListener("click", () => {
    // Clear the items array
    items = [];
    // Save the empty list to localStorage
    saveList();
    // Render the updated (empty) list
    renderList();
  });

  // Event listener to allow adding items by pressing the Enter key
  itemInput.addEventListener("keypress", (event) => {
    // Check if the key pressed is the Enter key
    if (event.key === "Enter") {
      // Trigger the click event for the "Add" button
      addButton.click();
    }
  });

  // Initial render of the list when the page loads
  renderList();
});

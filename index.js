/*
Note: the save tab button will not work properly if you are deploying the extension as a regular web page as the function used to get it uses the chrome api for extensions
*/

// array to store leads
let myLeads = [];
let oldLeads = [];
/*
can't change the const variables 
don't want to change element variables
*/
// storing input button as a variable
const inputBtn = document.querySelector("#input-btn");
// storing input text type as a variable
const inputEl = document.querySelector("#input-el");
// storing unordered list element as  a variable
const ulEl = document.querySelector("#ul-el");
// storing delete button element as a variable
const deleteBtn = document.querySelector("#delete-btn");
// variable to store save tab button
const tabBtn = document.querySelector("#tab-btn");

// getting leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);
// checking to see if there are leads in the local storage
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  // getting current tab will only work if it is deployed as an extension
  // tabs is an array that holds url objects
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    // pushing current tab to local storage and leads and rendering out leads
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  // outputting array of leads to the list element
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // adding all the list items to one variable using template strings
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
    
    `;
    console.log(listItems);

    // creating html elements without existing elements
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li);
  }
  ulEl.innerHTML = listItems;
}

// when delete button is double clicked clear local storage, myLeads, and the DOM
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// using event listener to call function when save button is clicked
inputBtn.addEventListener("click", function () {
  // getting value from the input field and adding it to the array
  myLeads.push(inputEl.value);
  // clearing the input field
  inputEl.value = "";

  // saving leads to local storage
  // key, value (which needs to be converted to a string because local storage can only hold strings)
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);

  console.log(localStorage.getItem("myLeads"));
});

/*
Note: the save tab button will not work properly if you are deploying the extension as a regular web page as the function used to get it uses the chrome api for extensions
*/

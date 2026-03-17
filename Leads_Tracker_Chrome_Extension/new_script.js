let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Load from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// SAVE INPUT
inputBtn.addEventListener("click", function () {
    const inputValue = inputEl.value.trim();

    if (inputValue === "") {
        alert("Please enter a valid URL 😅");
        return;
    }

    if (myLeads.includes(inputValue)) {
        alert("This link already exists ⚠️");
        return;
    }

    myLeads.push(inputValue);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

// SAVE TAB
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const url = tabs[0].url;

        if (!myLeads.includes(url)) {
            myLeads.push(url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        } else {
            alert("Tab already saved 😄");
        }
    });
});

// RENDER FUNCTION
function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
                ${leads[i]}
            </a>
            <button class="delete-item" data-index="${i}">❌</button>
        </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

// DELETE SINGLE ITEM (🔥 NEW FEATURE)
ulEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-item")) {
        const index = e.target.dataset.index;

        myLeads.splice(index, 1);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

// DELETE ALL (Single click now)
deleteBtn.addEventListener("click", function () {
    if (confirm("Delete all saved leads?")) {
        localStorage.removeItem("myLeads"); // ✅ better than clear()
        myLeads = [];
        render(myLeads);
    }
});
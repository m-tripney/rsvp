document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registrar");
  const input = form.querySelector("input");
  const mainDiv = document.querySelector(".main");
  const ul = document.querySelector("#invitedList");
  const div = document.createElement("div");
  const filterLabel = document.createElement("label");
  const filterCheckbox = document.createElement("input");

  filterLabel.textContent = "Show confirmed";
  filterCheckbox.type = "checkbox";
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);

  filterCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.className === "responded") {
          li.style.display = "";
        } else {
          li.style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        li.style.display = "";
      }
    }
  });

  function createLi(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    function appendToLi(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    const li = document.createElement("li");
    appendToLi("span", "textContent", text);
    // Add 'Confirmed' checkbox and label
    appendToLi("label", "textContent", "Confirmed").appendChild(
      createElement("input", "type", "checkbox")
    );
    // Add 'Edit' button
    appendToLi("button", "textContent", "edit");
    // Add 'Remove' button
    appendToLi("button", "textContent", "remove");
    return li;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = input.value;
    if (text) {
      // Now we've captured the user's input, clear the text entry field
      input.value = "";
      const li = createLi(text);
      ul.appendChild(li);
    }
  });

  // 'Confirmed' checkbox event
  ul.addEventListener("change", (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    listItem.classList.toggle("responded");
  });

  // 'Edit' & 'Remove' button events
  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement("input");
          input.type = "text";
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = "save";
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement("span");
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = "Edit";
        },
      };
      // Select and run action in button's name
      nameActions[action]();
    }
  });
});

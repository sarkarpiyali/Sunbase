document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("formContainer");
  const addElementButtons = document.querySelectorAll(".add-element");
  const saveButton = document.getElementById("saveForm");

  addElementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addElement(button.dataset.type);
    });
  });

  saveButton.addEventListener("click", saveForm);

  function addElement(type) {
    const element = document.createElement("div");
    element.classList.add("form-element");

    let inputElement;
    let labelText = "Label";

    if (type === "input") {
      labelText = "Sample Label";
      inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = "Enter text";
    } else if (type === "select") {
      labelText = "Select";
      inputElement = document.createElement("select");
      ["Option 1", "Option 2", "Option 3"].forEach((optionText) => {
        let option = document.createElement("option");
        option.textContent = optionText;
        inputElement.appendChild(option);
      });
    } else if (type === "textarea") {
      labelText = "Textarea";
      inputElement = document.createElement("textarea");
      inputElement.placeholder = "Enter text";
    }

    const label = document.createElement("label");
    label.textContent = labelText;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => element.remove());

    element.appendChild(label);
    element.appendChild(inputElement);
    element.appendChild(deleteButton);
    formContainer.appendChild(element);
  }

  function saveForm() {
    const elements = document.querySelectorAll(".form-element");
    const formData = [];

    elements.forEach((el) => {
      const label = el.querySelector("label").textContent;
      const input = el.querySelector("input, select, textarea");

      const data = {
        label: label,
        type: input.tagName.toLowerCase(),
        placeholder: input.placeholder || "",
        options:
          input.tagName === "SELECT"
            ? Array.from(input.options).map((o) => o.text)
            : undefined,
      };

      formData.push(data);
    });

    console.log("Saved Form Data:", JSON.stringify(formData, null, 2));
  }
});

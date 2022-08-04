{
    const tasks = [];

    const removeTextFromInput = () => {
        document.querySelector(".js-input").value = "";
    };

    const addNewTask = (newTask) => {
        tasks.push(
            {
                content: newTask,
            },
        );

        removeTextFromInput();

        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <ul class="list__item">
                    <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>
                    <span class="list__content ${task.done ? "list__content--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </ul>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;

        bindEvents();
    }

    const onFormElement = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-input").value.trim();

        if (newTask === "") {
            document.querySelector(".js-input").value = "";
            document.querySelector(".js-input").focus();
            return;
        }

        addNewTask(newTask);
    }

    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormElement);
    };

    init();
}
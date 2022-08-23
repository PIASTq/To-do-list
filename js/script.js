{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTextFromInput = () => {
        document.querySelector(".js-input").value = "";
    };

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask },
        ];

        removeTextFromInput();

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                    <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>
                    <span class="list__content ${task.done ? "list__content--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let headerContent = "Lista zadań";

        if (tasks.length > 0) {
            headerContent = `
                Lista zadań
                <button class="article__button article__button--toggleDoneTasksHiding">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
                <button class="article__button article__button--doAllTasksDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
        }

        document.querySelector(".js-listHeader").innerHTML = headerContent;
    };

    const onToggleDoneTasksHiding = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const onDoAllTasksDoneButton = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const bindButtonsEvents = () => {
        const toggleDoneTasksHiding = document.querySelector(".article__button--toggleDoneTasksHiding");
        const doAllTasksDoneButton = document.querySelector(".article__button--doAllTasksDoneButton");

        if (toggleDoneTasksHiding) {
            toggleDoneTasksHiding.addEventListener("click", onToggleDoneTasksHiding);
        }

        if (doAllTasksDoneButton) {
            doAllTasksDoneButton.addEventListener("click", onDoAllTasksDoneButton);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
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
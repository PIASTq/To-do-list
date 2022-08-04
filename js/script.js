{
    const tasks = [];

    const addNewTask = (newTask) => {
        tasks.push(
            {
                content: newTask,
            },
        );

        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <ul class="list__item ${task.done ? "list__item--done" : ""}">
                    <button class="list__button list__button--done js-done"></button>
                    <span class="list__content">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </ul>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    }

    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTask = document.querySelector(".js-input").value.trim();

            addNewTask(newTask);
        });
    };

    init();
}
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
                    ${task.content}
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
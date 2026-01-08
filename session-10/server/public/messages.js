const tbody = document.getElementById("tbody");

async function loadMessages() {
    try {
        const res = await fetch("/messages");
        const json = await res.json();

        if(json.ok){
            for (let index = 0; index < json.data.length; index++) {
                const message = json.data[index];
                
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.message}</td>
                `;

                tbody.appendChild(tr);
            }
        }
    } catch (error) {
        console.error("There is an error while fetching messages", error);
    }
}

loadMessages();
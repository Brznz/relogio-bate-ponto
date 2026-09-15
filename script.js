const sendButton = document.querySelector("#Send");

sendButton.addEventListener("click", async function () {

    const relogio = document.querySelector("#relogio");
    const bobina = document.querySelector('input[name="bobina"]:checked')



    const time = new Date();
    const relogioSelecionado = relogio.selectedOptions[0].text;


    const registro = {
        relogio: relogioSelecionado,
        horario: time.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        }),
        bobina_trocada: bobina.value
    }

    const arquivo = new File(
        [registro],
        "registro.txt",
        { type: "text/plain" }
    )

    await navigator.share({
        files: [arquivo]
    })

    fetch("https://john-kelp-balance.ngrok-free.dev/registro", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },

        body: JSON.stringify(registro)
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
        })
})
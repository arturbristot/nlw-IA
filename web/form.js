import { server } from "./server"

const form = document.querySelector("#form")
const input = document.querySelector("#url") // acho que é URL
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) =>{
  content.classList.add("placeholder")
  event.preventDefault()

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse video não parece ser um short...")
  }

  var params = videoURL.split("/shorts/")[1] // RETORNA UMA ARRAY DE 2, QUERO SÓ O (PARAMETRO)
  var params = params.split("?si")[0]

  console.log("params :", params)

  content.textContent = "Transcrevendo áudio..."

  const transcription = await server.get("/summary/" + params)

  content.textContent = "realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result, 
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})


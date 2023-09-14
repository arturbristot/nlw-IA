import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoURL = "https://youtube.com/shorts/" + videoId
  console.log("Baixando:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"})
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if (seconds > 60){
      throw new Error("Duração maior que 60 segundos.")
    }}).on("end", () => {
      console.log("Download finalizado!")
      resolve()
    }).on("error", (error) => {
      console.log("Não foi possivel baixar o video. Erro:", error)
      reject(error)
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
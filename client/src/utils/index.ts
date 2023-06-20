import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export default function getRandomPrompt(prompt:string):string{
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPropmt = surpriseMePrompts[randomIndex]
    
    if(randomPropmt === prompt) return getRandomPrompt(prompt)

    return randomPropmt;
}

export async function downloadImage(_id:number,photo:string){
    FileSaver.saveAs(photo,`download${_id}.jpg`)
}
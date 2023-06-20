import React from "react";
import  download  from "../assets/download.png";
import {downloadImage } from "../utils";

interface Card{
  _id:number,
  name:string,
  prompt:string,
  photo:string
}

const Card = ({ _id, name, prompt, photo }:Card) => {
  return (
    <div className="relative rounded-xl group shadow-card hover:shadow-cardhover card">
      <img className="object-cover w-full h-auto rounded-xl"  src={photo}/>
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] p-f rounded-md m-2">
      <p className="overflow-y-auto text-white text-md prompt">{prompt}</p>
    <div className="flex items-center justify-between gap-2 mt-5">
      <div className="flex items-center gap-2">
        <div className="justify-center font-bold text-center text-white bg-green-700 rounded-full w-7 h-7 text-cs">
          {name[0].toUpperCase()}
        </div>
        <p className="mr-6 text-sm text-white">{name}</p>
      </div>
      <div>
        <button type="button" onClick={()=>downloadImage(_id,photo)} className="bg-transparent border-none outline-none">
          <img src={download} className="object-contain w-6 h-6 invert"/>
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Card;

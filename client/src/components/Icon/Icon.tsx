import { FC } from "react";
import Back from "../../assets/icons/back.svg";
import Erase from "../../assets/icons/erase.svg";
import Note from "../../assets/icons/note.svg";
import Tip from "../../assets/icons/tip.svg";

export type IconFilename = "back" | "erase" | "note" | "tip";

interface Props {
  name: IconFilename;
}

const getImage = (name: IconFilename) => {
  switch (name) {
    case "back":
      return Back;
    case "erase":
      return Erase;
    case "note":
      return Note;
    case "tip":
      return Tip;
    default:
      return "";
  }
};

export const Icon: FC<Props> = ({ name }) => {
  return <img src={getImage(name)} alt={name} />;
};

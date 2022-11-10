import { RotorSettings2 } from "../types/types";

export const handleSettingsStylesChange = ({
  moodEnergy,
  diversity,
  language,
}: RotorSettings2) => {
  const moodStyles = {
    width: "",
    transform: "",
  };
  switch (
    moodEnergy //moodEnergy: "all" | "sad" | "calm" | "fun" | "active";
  ) {
    case "all": {
      moodStyles.width = "100px";
      moodStyles.transform = "translateX(400%)";
      break;
    }
    case "sad": {
    }
  }
};

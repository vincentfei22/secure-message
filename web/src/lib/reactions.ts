import {
  EmojiHappyIcon as EmojiHappyIconSolid,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
} from "@heroicons/react/solid";

const excitedReaction = {
  name: "Excited",
  value: "excited",
  icon: FireIcon,
  iconColor: "text-white",
  bgColor: "bg-red-500",
};

const lovedReaction = {
  name: "Loved",
  value: "loved",
  icon: HeartIcon,
  iconColor: "text-white",
  bgColor: "bg-pink-400",
};

const happyReaction = {
  name: "Happy",
  value: "happy",
  icon: EmojiHappyIconSolid,
  iconColor: "text-white",
  bgColor: "bg-green-400",
};

const sadReaction = {
  name: "Sad",
  value: "sad",
  icon: EmojiSadIcon,
  iconColor: "text-white",
  bgColor: "bg-yellow-400",
};

const thumbsyReaction = {
  name: "Thumbsy",
  value: "thumbsy",
  icon: ThumbUpIcon,
  iconColor: "text-white",
  bgColor: "bg-blue-500",
};

const nothingReaction = {
    name: "I feel nothing",
    value: null,
    icon: XIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent"
}

export const reactions = [
    excitedReaction, 
    lovedReaction, 
    happyReaction, 
    sadReaction, 
    thumbsyReaction, 
    nothingReaction
];

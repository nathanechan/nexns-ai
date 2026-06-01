import master from "./00_master.png";
import defaultNex from "./01_default.png";
import welcome from "./02_welcome.png";
import thinking from "./03_thinking.png";
import guiding from "./04_guiding.png";
import happy from "./05_happy.png";
import sleeping from "./06_sleeping.png";
import prediction from "./07_prediction.png";
import creator from "./08_creator.png";
import project from "./09_project.png";
import investor from "./10_investor.png";
import community from "./11_community.png";
import leader from "./12_leader.png";
import reward from "./13_reward.png";
import quest from "./14_quest.png";
import evolution from "./15_evolution.png";
import activity from "./16_activity.png";
import support from "./17_support.png";
import legend from "./18_legend.png";

export const characterAssets = {
  master,
  default: defaultNex,
  welcome,
  thinking,
  guiding,
  happy,
  sleeping,
  prediction,
  creator,
  project,
  investor,
  community,
  leader,
  reward,
  quest,
  evolution,
  activity,
  support,
  legend,
} as const;

export type CharacterVariant = keyof typeof characterAssets;

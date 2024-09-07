// import { useEffect, useState } from "react";
import miserablesData from "../assets/data/miserables.json";

interface MiserablesNode {
  name: string;
  group: number;
}

interface MiserablesLink {
  source: number;
  target: number;
  value: number;
}

interface MiserablesData {
  nodes: MiserablesNode[];
  links: MiserablesLink[];
}

export default miserablesData as MiserablesData;

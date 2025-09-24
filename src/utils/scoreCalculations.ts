// Score calculation utilities
export const statToScore = (stat: number): number => {
  const blockSize = 50;
  const multipliers = [
    0.5, 0.8, 1, 1.3, 1.6, 1.8, 2.1, 2.4, 2.6, 2.8,
    2.9, 3, 3.1, 3.3, 3.4, 3.5, 3.9, 4.1, 4.2, 4.3,
    5.2, 5.5, 6.6, 6.8, 6.9
  ];
  
  const blocks = Math.floor(stat / blockSize);
  const remainder = stat % blockSize;
  
  let blockSum = 0;
  for (let i = 0; i < blocks && i < multipliers.length; i++) {
    blockSum += multipliers[i] * blockSize;
  }
  
  let remainderSum = 0;
  if (blocks < multipliers.length) {
    remainderSum = multipliers[blocks] * (remainder + 1); // Excel uses +1
  }
  
  return Math.floor(blockSum + remainderSum);
};

export const calculateUmaScore = (uniqueSkillLvl: number, umaStarLvl: string): number => {
  if (umaStarLvl === "1★" || umaStarLvl === "2★") {
    return uniqueSkillLvl * 120;
  }
  if (umaStarLvl === "3★" || umaStarLvl === "4★" || umaStarLvl === "5★") {
    return uniqueSkillLvl * 170;
  }
  return 0;
};

export const getRank = (score: number): string => {
  if (score <= 299) return "G";
  else if (score <= 599) return "G+";
  else if (score <= 899) return "F";
  else if (score <= 1299) return "F+";
  else if (score <= 1799) return "E";
  else if (score <= 2299) return "E+";
  else if (score <= 2899) return "D";
  else if (score <= 3499) return "D+";
  else if (score <= 4899) return "C";
  else if (score <= 6499) return "C+";
  else if (score <= 8199) return "B";
  else if (score <= 8999) return "B+";
  else if (score <= 12099) return "A";
  else if (score <= 14499) return "A+";
  else if (score <= 15899) return "S";
  else if (score <= 17499) return "S+";
  else if (score >= 20000) return "SS";
  return "-";
};

export const getNextRankScore = (score: number): number => {
  const thresholds = [300, 600, 900, 1300, 1800, 2300, 2900, 3500, 4900, 6500, 8200, 10000, 12100, 14500, 15900, 17500, 20000];
  for (const threshold of thresholds) {
    if (score < threshold) return threshold - score;
  }
  return 0;
};
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import StatInput from './components/StatInput';
import SkillSelector from './components/SkillSelector';
import UmaSettings from './components/UmaSettings';
import ResultDisplay from './components/ResultDisplay';
import { Skill } from './types/skills';
import { statToScore, calculateUmaScore, getRank, getNextRankScore } from './utils/scoreCalculations';

const App: React.FC = () => {
  // Base stats state
  const [stats, setStats] = useState({
    speed: 756,
    stamina: 818,
    power: 326,
    guts: 373,
    wisdom: 311
  });

  // Computed stat scores
  const [statScores, setStatScores] = useState({
    speed: 0,
    stamina: 0,
    power: 0,
    guts: 0,
    wisdom: 0
  });

  // Skills state
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  // UMA settings state
  const [uniqueSkillLevel, setUniqueSkillLevel] = useState(1);
  const [umaStarLevel, setUmaStarLevel] = useState('1★');

  // Results state
  const [totalScore, setTotalScore] = useState(0);
  const [rank, setRank] = useState('');
  const [nextRankScore, setNextRankScore] = useState(0);

  // Update stat scores whenever base stats change
  useEffect(() => {
    setStatScores({
      speed: statToScore(stats.speed),
      stamina: statToScore(stats.stamina),
      power: statToScore(stats.power),
      guts: statToScore(stats.guts),
      wisdom: statToScore(stats.wisdom)
    });
  }, [stats]);

  // Handle stat changes
  const handleStatChange = (statName: keyof typeof stats, value: number) => {
    setStats(prev => ({ ...prev, [statName]: value }));
  };

  // Handle skill management
  const handleSkillAdd = (skill: Skill) => {
    setSelectedSkills(prev => [...prev, skill]);
  };

  const handleSkillRemove = (index: number) => {
    setSelectedSkills(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate final score
  const calculateFinalScore = () => {
    // Base stats score
    const baseScore = Object.values(statScores).reduce((sum, score) => sum + score, 0);
    
    // Skills score
    const skillScore = selectedSkills.reduce((sum, skill) => sum + skill.evalPoints, 0);
    
    // UMA score
    const umaScore = calculateUmaScore(uniqueSkillLevel, umaStarLevel);
    
    // Total score
    const total = baseScore + skillScore + umaScore;
    
    // Update results
    setTotalScore(total);
    setRank(getRank(total));
    setNextRankScore(getNextRankScore(total));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Jaran</h1>
          </div>
          <p className="text-gray-600">Ya mandan akurat ndean</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Base Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Base Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatInput
                  label="Speed"
                  value={stats.speed}
                  score={statScores.speed}
                  onChange={(value) => handleStatChange('speed', value)}
                  color="text-red-600"
                />
                <StatInput
                  label="Stamina"
                  value={stats.stamina}
                  score={statScores.stamina}
                  onChange={(value) => handleStatChange('stamina', value)}
                  color="text-green-600"
                />
                <StatInput
                  label="Power"
                  value={stats.power}
                  score={statScores.power}
                  onChange={(value) => handleStatChange('power', value)}
                  color="text-orange-600"
                />
                <StatInput
                  label="Guts"
                  value={stats.guts}
                  score={statScores.guts}
                  onChange={(value) => handleStatChange('guts', value)}
                  color="text-pink-600"
                />
                <StatInput
                  label="Wisdom"
                  value={stats.wisdom}
                  score={statScores.wisdom}
                  onChange={(value) => handleStatChange('wisdom', value)}
                  color="text-blue-600"
                />
              </div>
            </div>

            {/* UMA Settings */}
            <UmaSettings
              uniqueSkillLevel={uniqueSkillLevel}
              umaStarLevel={umaStarLevel}
              onUniqueSkillLevelChange={setUniqueSkillLevel}
              onUmaStarLevelChange={setUmaStarLevel}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <SkillSelector
              selectedSkills={selectedSkills}
              onSkillAdd={handleSkillAdd}
              onSkillRemove={handleSkillRemove}
            />

            {/* Results */}
            <ResultDisplay
              totalScore={totalScore}
              rank={rank}
              nextRankScore={nextRankScore}
              onCalculate={calculateFinalScore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
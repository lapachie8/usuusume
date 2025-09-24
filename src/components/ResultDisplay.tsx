import React from 'react';
import { Calculator, Trophy, Target } from 'lucide-react';

interface ResultDisplayProps {
  totalScore: number;
  rank: string;
  nextRankScore: number;
  onCalculate: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  totalScore, 
  rank, 
  nextRankScore, 
  onCalculate 
}) => {
  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'SS': return 'text-purple-600 bg-purple-100';
      case 'S+': case 'S': return 'text-yellow-600 bg-yellow-100';
      case 'A+': case 'A': return 'text-orange-600 bg-orange-100';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-100';
      case 'C+': case 'C': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Results</h3>
      
      <button
        onClick={onCalculate}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <Calculator className="w-5 h-5" />
        Calculate Score
      </button>

      {totalScore > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div>
              <div className="text-sm text-gray-600">Total Score</div>
              <div className="text-2xl font-bold text-gray-800">{totalScore.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(rank)}`}>
              {rank}
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Rank</div>
              <div className="text-xl font-semibold text-gray-800">{rank}</div>
            </div>
          </div>

          {nextRankScore > 0 && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Target className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">Points to Next Rank</div>
                <div className="text-xl font-semibold text-gray-800">{nextRankScore.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
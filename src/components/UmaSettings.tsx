import React from 'react';

interface UmaSettingsProps {
  uniqueSkillLevel: number;
  umaStarLevel: string;
  onUniqueSkillLevelChange: (level: number) => void;
  onUmaStarLevelChange: (level: string) => void;
}

const UmaSettings: React.FC<UmaSettingsProps> = ({
  uniqueSkillLevel,
  umaStarLevel,
  onUniqueSkillLevelChange,
  onUmaStarLevelChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Set skill uma</h3>
      <p>liat bintang uma lo sama lvl skill ulti</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unique Skill Level:
          </label>
          <select
            value={uniqueSkillLevel}
            onChange={(e) => onUniqueSkillLevelChange(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uma Star Level:
          </label>
          <select
            value={umaStarLevel}
            onChange={(e) => onUmaStarLevelChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {['1★', '2★', '3★', '4★', '5★'].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UmaSettings;
import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Skill, skills } from '../types/skills';

interface SkillSelectorProps {
  selectedSkills: Skill[];
  onSkillAdd: (skill: Skill) => void;
  onSkillRemove: (index: number) => void;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({ selectedSkills, onSkillAdd, onSkillRemove }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Filter skills based on search query
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAddSkill = () => {
    if (selectedIndex >= 0 && selectedIndex < filteredSkills.length) {
      const skill = filteredSkills[selectedIndex];
      onSkillAdd(skill);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Skills</h3>
      
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Skill selection dropdown */}
      <select
        size={8}
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
        className="w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {filteredSkills.map((skill, index) => (
          <option key={index} value={index} className="py-1 px-2">
            {skill.name} ({skill.evalPoints})
          </option>
        ))}
      </select>

      {/* Add skill button */}
      <button
        onClick={handleAddSkill}
        disabled={selectedIndex < 0}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Add Skill
      </button>

      {/* Selected skills */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-700 mb-3">Selected Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill.name} ({skill.evalPoints})</span>
              <button
                onClick={() => onSkillRemove(index)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;
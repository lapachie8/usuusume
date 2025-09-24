import React from 'react';

interface StatInputProps {
  label: string;
  value: number;
  score: number;
  onChange: (value: number) => void;
  color: string;
}

const StatInput: React.FC<StatInputProps> = ({ label, value, score, onChange, color }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className={`text-sm mt-2 font-medium ${color}`}>
        Score: {score}
      </div>
    </div>
  );
};

export default StatInput;
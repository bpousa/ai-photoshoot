import React from 'react';

interface Suggestion {
  prompt: string;
  reason: string;
}

interface AiAssistantProps {
  currentPrompt: string;
  style: string;
  onSuggestionSelect: (prompt: string) => void;
}

export function AiAssistant({
  currentPrompt,
  style,
  onSuggestionSelect
}: AiAssistantProps) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const generateSuggestions = async () => {
    setIsLoading(true);
    try {
      // This would integrate with our Claude service
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt, style })
      });
      
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          AI Suggestions
        </h3>
        <button
          onClick={generateSuggestions}
          disabled={isLoading}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {isLoading ? 'Thinking...' : 'Get Ideas'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onSuggestionSelect(suggestion.prompt)}
            >
              <p className="text-sm text-gray-900 mb-1">
                {suggestion.prompt}
              </p>
              <p className="text-xs text-gray-500">
                Why: {suggestion.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
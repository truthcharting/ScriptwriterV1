import React, { useState } from 'react';
import { FileText, Video, Users, Target, Clock, MessageSquare, Eye, Plus, Loader2 } from 'lucide-react';

const CatholicScriptGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    goal: '',
    targetAudience: '',
    tone: '',
    duration: '',
    keyPoints: '',
    callToAction: '',
    visualStyle: '',
    additionalNotes: ''
  });
  
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateScript = async () => {
    setIsGenerating(true);
    
    try {
      const prompt = `
You are a Catholic content creator writing scripts that are faithful to Church teaching and approved by the Magisterium. 

Based on the following form data, write an approximately 500-word script in a table format with two columns:
- Left column: Audio/Spoken content  
- Right column: Visual descriptions

Form Data:
Topic: ${formData.topic}
Goal: ${formData.goal}
Target Audience: ${formData.targetAudience}
Tone: ${formData.tone}
Duration: ${formData.duration}
Key Points: ${formData.keyPoints}
Call to Action: ${formData.callToAction}
Visual Style: ${formData.visualStyle}
Additional Notes: ${formData.additionalNotes}

Requirements:
1. All content must be faithful to Catholic Church teaching and Magisterium
2. Use the script format from the provided example document with AUDIO and VISUAL columns
3. Include talking head segments mixed with visuals (use "+ Cut to talking head" in visual column)
4. Make it engaging while maintaining reverence for the subject matter
5. Approximately 500 words in the audio column
6. Include specific visual direction in the right column
7. Format as a proper table with clear column headers

Write the script now in markdown table format:
`;

      const response = await window.claude.complete(prompt);
      setGeneratedScript(response);
      setShowScript(true);
    } catch (error) {
      console.error('Error generating script:', error);
      setGeneratedScript('Error generating script. Please try again.');
      setShowScript(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const FormField = ({ icon: Icon, label, field, placeholder, type = "text", required = false }) => (
    <div className="mb-6">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <Icon className="w-4 h-4 mr-2 text-blue-600" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        />
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        />
      )}
    </div>
  );

  if (showScript) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                Generated Catholic Script
              </h1>
              <button
                onClick={() => setShowScript(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New Script
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Script Topic: {formData.topic}</h3>
              <p className="text-sm text-gray-600">Goal: {formData.goal}</p>
            </div>
            
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap font-mono text-sm bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                {generatedScript}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Catholic Script Generator
            </h1>
            <p className="text-gray-600">
              Create engaging Catholic content scripts faithful to Church teaching
            </p>
          </div>

          <div>
            <FormField
              icon={FileText}
              label="Topic"
              field="topic"
              placeholder="e.g., The Miracle of Fatima, Saint Francis of Assisi, The Eucharist"
              required
            />

            <FormField
              icon={Target}
              label="Goal/Purpose"
              field="goal"
              placeholder="e.g., Educate viewers about the apparitions, Inspire devotion to prayer"
              type="textarea"
              required
            />

            <FormField
              icon={Users}
              label="Target Audience"
              field="targetAudience"
              placeholder="e.g., Young Catholics, Curious non-Catholics, Families"
              required
            />

            <FormField
              icon={MessageSquare}
              label="Tone/Style"
              field="tone"
              placeholder="e.g., Reverent but engaging, Educational and inspiring, Conversational"
              required
            />

            <FormField
              icon={Clock}
              label="Duration"
              field="duration"
              placeholder="e.g., 3-4 minutes, 5 minutes, 2 minutes"
              required
            />

            <FormField
              icon={Plus}
              label="Key Points to Include"
              field="keyPoints"
              placeholder="e.g., Historical context, specific miracles, Church approval, key teachings"
              type="textarea"
              required
            />

            <FormField
              icon={Target}
              label="Call to Action"
              field="callToAction"
              placeholder="e.g., Encourage daily rosary, Visit a shrine, Deepen prayer life"
            />

            <FormField
              icon={Eye}
              label="Visual Style"
              field="visualStyle"
              placeholder="e.g., Historical reenactment with talking head, Graphics and animations, Location shots"
              type="textarea"
            />

            <FormField
              icon={FileText}
              label="Additional Notes"
              field="additionalNotes"
              placeholder="Any specific requirements, sources to reference, or special considerations"
              type="textarea"
            />

            <button
              onClick={generateScript}
              disabled={isGenerating || !formData.topic || !formData.goal}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5 mr-2" />
                  Generate Catholic Script
                </>
              )}
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              ✝️ Faithful to Church Teaching
            </h3>
            <p className="text-sm text-blue-700">
              All generated scripts are designed to be faithful to Catholic Church teaching and approved by the Magisterium. 
              Always review content with your spiritual director or parish priest before publication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatholicScriptGenerator;
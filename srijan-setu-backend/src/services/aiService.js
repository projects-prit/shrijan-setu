const { GoogleGenAI, Type } = require('@google/genai');
const Challenge = require('../models/Challenge');
const Institution = require('../models/Institution');

const ai = new GoogleGenAI({}); // Auto-detects GEMINI_API_KEY from environment

exports.processChallengeWithAI = async (challengeId) => {
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) throw new Error('Challenge not found');

    const institutions = await Institution.find({ verification_status: 'verified' });

    const prompt = `
You are an AI moderator for the Government of Jharkhand's 'Srijan Setu' platform.
Your job is to analyze a societal challenge submitted by a citizen, categorize it, assign a priority score (1-100), and suggest up to 3 relevant Higher Education Institutions (HEIs) in Jharkhand that can help solve it based on their expertise.

Citizen Challenge Title: ${challenge.title}
Challenge Description: ${challenge.description}
Challenge District: ${challenge.district}

Available Verified Institutions:
${institutions.map(inst => `- ID: ${inst._id.toString()} | Name: ${inst.name} | Region: ${inst.region} | Expertise: ${inst.expertise_domains.join(', ')}`).join('\n')}

Instructions:
1. "category": Identify the primary domain of this challenge (e.g., Water & Sanitation, Infrastructure, Education, Healthcare, Agriculture).
2. "priority_score": Assign a priority score from 1-100 based on the urgency, impact, and severity of the problem.
3. "matched_institutions": From the list of available verified institutions provided above, select up to 3 that are best suited to solve this challenge. 
   - Strongly prefer institutions located in or near the same district/region as the challenge (${challenge.district}).
   - Also consider the institution's expertise domains.
   - For each selected institution, provide its exact string ID and a "match_score" (1-100) indicating how good the fit is.
`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING },
        priority_score: { type: Type.INTEGER },
        matched_institutions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              institution_id: { type: Type.STRING },
              match_score: { type: Type.INTEGER }
            }
          }
        }
      },
      required: ["category", "priority_score", "matched_institutions"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2
      }
    });

    const aiResult = JSON.parse(response.text);

    // Update the challenge with the AI insights
    challenge.category = aiResult.category;
    challenge.priority_score = aiResult.priority_score;
    challenge.matched_institutions = aiResult.matched_institutions.map(match => ({
      institution_id: match.institution_id,
      match_score: match.match_score
    }));
    challenge.status = 'matched';

    await challenge.save();
    console.log(`[AI SUCCESS] Challenge ${challenge.tracking_id} processed by Gemini.`);

  } catch (error) {
    console.error(`[AI ERROR] Failed to process challenge ${challengeId}:`, error);
  }
};

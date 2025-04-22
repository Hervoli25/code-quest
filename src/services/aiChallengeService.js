// Code written and maintained by Elisee Kajingu
import { supabase } from '../supabaseClient';

// Save an AI-generated challenge
export async function saveAiChallenge(challenge, userId, isPublic = false) {
  try {
    const { data, error } = await supabase
      .from('ai_challenges')
      .insert({
        user_id: userId,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        category: challenge.category,
        language: challenge.language,
        starter_code: challenge.starterCode,
        hints: challenge.hints,
        tests: challenge.tests,
        solution: challenge.solution,
        is_public: isPublic
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving AI challenge:", error);
    throw error;
  }
}

// Get user's AI challenges
export async function getUserAiChallenges(userId) {
  try {
    const { data, error } = await supabase
      .from('ai_challenges')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting AI challenges:", error);
    throw error;
  }
}

// Get public AI challenges
export async function getPublicAiChallenges(language = null, difficulty = null) {
  try {
    let query = supabase
      .from('ai_challenges')
      .select('*')
      .eq('is_public', true);
    
    if (language) {
      query = query.eq('language', language);
    }
    
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting public AI challenges:", error);
    throw error;
  }
}

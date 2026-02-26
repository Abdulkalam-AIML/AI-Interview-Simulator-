import { getCosineSimilarity } from "./similarity";

interface AnalysisResult {
    score: number;
    feedback: string[];
}

export function analyzeAnswer(userAnswer: string, idealAnswer: string, keywords: string[]): AnalysisResult {
    const similarity = getCosineSimilarity(userAnswer, idealAnswer);
    const userWords = userAnswer.toLowerCase();

    const matchedKeywords = keywords.filter(kw => userWords.includes(kw.toLowerCase()));
    const keywordScore = matchedKeywords.length / keywords.length;

    // Combine similarity and keyword matching (weighted)
    // 60% Similarity, 40% Keyword accuracy
    const rawScore = (similarity * 0.6) + (keywordScore * 0.4);
    const finalScore = Math.round(rawScore * 100);

    const feedback: string[] = [];

    if (finalScore > 80) {
        feedback.push("Excellent answer! You covered the key concepts and explained them well.");
    } else if (finalScore > 50) {
        feedback.push("Good attempt, but you could be more specific.");
        const missing = keywords.filter(kw => !matchedKeywords.includes(kw));
        if (missing.length > 0) {
            feedback.push(`Try to include these terms: ${missing.slice(0, 3).join(", ")}.`);
        }
    } else {
        feedback.push("This answer is too brief or off-topic.");
        feedback.push("Focus more on the technical definition and core principles.");
    }

    return {
        score: Math.min(finalScore, 100),
        feedback
    };
}

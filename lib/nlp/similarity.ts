export function getCosineSimilarity(str1: string, str2: string): number {
    const getVector = (text: string) => {
        const words = text.toLowerCase().match(/\w+/g) || [];
        const vector: Record<string, number> = {};
        words.forEach(word => {
            vector[word] = (vector[word] || 0) + 1;
        });
        return vector;
    };

    const v1 = getVector(str1);
    const v2 = getVector(str2);

    const words = Array.from(new Set([...Object.keys(v1), ...Object.keys(v2)]));

    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    words.forEach(word => {
        const freq1 = v1[word] || 0;
        const freq2 = v2[word] || 0;
        dotProduct += freq1 * freq2;
        mag1 += freq1 * freq1;
        mag2 += freq2 * freq2;
    });

    if (mag1 === 0 || mag2 === 0) return 0;
    return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

export const questions = {
    frontend: [
        {
            id: "fe1",
            question: "What is the difference between Virtual DOM and Real DOM in React?",
            keywords: ["diffing", "reconciliation", "performance", "batching", "memory"],
            idealAnswer: "The Virtual DOM is a lightweight copy of the Real DOM. React uses it to find the minimum number of changes needed to update the UI through reconciliation and diffing algorithms, making it more efficient than direct DOM manipulation."
        },
        {
            id: "fe2",
            question: "Explain CSS Box Model.",
            keywords: ["content", "padding", "border", "margin", "box-sizing"],
            idealAnswer: "The CSS Box Model is the foundation of design and layout. It consists of margins, borders, padding, and the actual content. 'box-sizing: border-box' is often used to include padding and border in the element's total width/height."
        }
    ],
    backend: [
        {
            id: "be1",
            question: "Explain the difference between SQL and NoSQL databases.",
            keywords: ["relational", "schema", "scaling", "acid", "document", "flexible"],
            idealAnswer: "SQL databases are relational, use structured schemas, and are typically vertically scalable. NoSQL databases are non-relational, have flexible schemas (like Document or Key-Value), and are designed for horizontal scalability."
        }
    ],
    ai: [
        {
            id: "ai1",
            question: "What is Overfitting in Machine Learning and how can you prevent it?",
            keywords: ["noise", "generalization", "regularization", "dropout", "validation", "augmentation"],
            idealAnswer: "Overfitting occurs when a model learns the training data and its noise too well, failing to generalize to new data. It can be prevented using techniques like cross-validation, regularization (L1/L2), dropout, or increasing the training dataset size."
        }
    ]
};

export type Role = keyof typeof questions;

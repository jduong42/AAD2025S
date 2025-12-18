import { Recipe, Ingredient } from "@/types";

export const extractIngredients = (recipe: Recipe): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Recipe;
    const measureKey = `strMeasure${i}` as keyof Recipe;

    const ingredient = recipe[ingredientKey];
    const measure = recipe[measureKey];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return ingredients;
};

export const formatInstructions = (instructions: string): string[] => {
  if (!instructions || instructions.trim() === "") return [];

  // Remove extra whitespace and normalize
  let normalized = instructions.trim();

  // Try different splitting strategies in order of preference

  // Strategy 1: Split by "STEP X" or "Step X:" (case insensitive)
  let steps = normalized
    .split(/(?:^|\n)\s*STEP\s+\d+:?\s*/gi)
    .filter((s) => s.trim());

  // Strategy 2: Split by numbered list with period (1. 2. 3.)
  if (steps.length <= 1) {
    steps = normalized.split(/(?:^|\n)\s*\d+\.\s+/).filter((s) => s.trim());
  }

  // Strategy 3: Split by double newlines (paragraph breaks)
  if (steps.length <= 1) {
    steps = normalized.split(/\n\s*\n/).filter((s) => s.trim());
  }

  // Strategy 4: Split by single newlines
  if (steps.length <= 1) {
    steps = normalized.split(/\n+/).filter((s) => s.trim());
  }

  // Strategy 5: Split by sentence endings followed by capital letter
  // Only if we still have a huge single paragraph
  if (steps.length === 1 && steps[0].length > 300) {
    steps = normalized
      .split(/\.(?=\s+[A-Z])/)
      .filter((s) => s.trim())
      .map((s) => s.trim() + (s.endsWith(".") ? "" : "."));
  }

  // Clean up each step
  steps = steps
    .map((step) => {
      return step
        .trim()
        .replace(/^step\s+\d+:?\s*/i, "") // Remove "Step X:"
        .replace(/^\d+\.\s*/, "") // Remove "1. "
        .replace(/^[-•]\s*/, "") // Remove bullet points
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();
    })
    .filter((step) => {
      // Filter out empty steps or very short ones (likely artifacts)
      return step.length > 10;
    });

  // If we still only have 1 or 2 very long steps, try harder to split
  if (steps.length <= 2 && steps.some((s) => s.length > 500)) {
    const megaStep = steps.join(" ");

    // Split on common cooking instruction transitions
    const transitions = [
      /\.\s+(?=Then\s)/gi,
      /\.\s+(?=Next\s)/gi,
      /\.\s+(?=After\s)/gi,
      /\.\s+(?=Once\s)/gi,
      /\.\s+(?=Now\s)/gi,
      /\.\s+(?=Meanwhile\s)/gi,
      /\.\s+(?=Finally\s)/gi,
      /\.\s+(?=Add\s)/gi,
      /\.\s+(?=Pour\s)/gi,
      /\.\s+(?=Mix\s)/gi,
      /\.\s+(?=Cook\s)/gi,
      /\.\s+(?=Heat\s)/gi,
      /\.\s+(?=Place\s)/gi,
      /\.\s+(?=Remove\s)/gi,
    ];

    let bestSplit = steps;
    for (const transition of transitions) {
      const attempt = megaStep.split(transition);
      if (attempt.length > bestSplit.length) {
        bestSplit = attempt.map((s) => s.trim()).filter((s) => s.length > 10);
      }
    }

    steps = bestSplit;
  }

  return steps;
};

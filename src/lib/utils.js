import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const conversions = {
  unidades: 1,
  mililitros: 1,
  gramos: 1,
  taza: 200, // 1 taza = 240 gramos
  media_taza: 100, // 1/2 taza = 120 gramos
  cucharada: 15, // 1 cucharada = 15 gramos
  cucharadita: 5, // 1 cucharadita = 5 gramos
};

export function getPrice(ingredient) {
  const { measure, quantity, pricePerUnit } = ingredient;
  const quantityInGrams = quantity * conversions[measure];
  const price = (quantityInGrams / conversions["gramos"]) * pricePerUnit;
  return price.toFixed(2);
}

export function parseMeasure(measure) {
  let parseMeasure;

  switch (measure) {
    case "media_taza":
      parseMeasure = "Media Taza";
      break;
    case "taza":
      parseMeasure = "Taza";
      break;
    case "unidades":
      parseMeasure = "Unidades";
      break;
    case "gramos":
      parseMeasure = "Gramos";
      break;
    case "mililitros":
      parseMeasure = "Mililitros";
      break;
    case "cucharada":
      parseMeasure = "Cucharada";
      break;
    case "cucharadita":
      parseMeasure = "Cucharadita";
      break;
  }

  return parseMeasure;
}

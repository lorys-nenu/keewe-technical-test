import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});
}
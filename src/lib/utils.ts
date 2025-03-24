/**
 * Utility Functions
 * This file contains common utility functions used throughout the application
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * Useful for combining Tailwind CSS classes with dynamic classes
 * @param inputs - Class names to combine
 * @returns Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

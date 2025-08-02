import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handlePlural(value: number, unit: string, shouldTruncate: boolean = false): string {
  unit = " " + unit;
  if (value > 1 && unit != " ") {
    unit += "s";
  }

  if (shouldTruncate && value > 1000) {
    value = Math.floor(value / 1000);
    unit = "K" + unit;
  } else {
    const formattedNumber = new Intl.NumberFormat('en-US').format(value);
    return `${formattedNumber}${unit}`;
  }

  return `${value}${unit}`;
}

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // Adjust scroll position to account for sticky header height if needed
    const headerOffset = 120 // Approximate height of the sticky header
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    })
  }
}

export function calculatePassedTime(lastTime: string | number): string {
    const lastDate = new Date(lastTime);
    const currentDate = new Date();
    const diff = currentDate.getTime() - lastDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    if (diffInDays < 1) {
        const diffInHours = diff / (1000 * 3600);
        if (diffInHours < 1) {
            const diffInMinutes = diff / (1000 * 60);
            if (diffInMinutes < 1) {
                return "Just now";
            } else {
                return `${Math.floor(diffInMinutes)} minutes ago`;
            }
        } else {
            return `${Math.floor(diffInHours)} hours ago`;
        }
    } else if (diffInDays < 2) {
        return "Yesterday";
    } else {
        return `${Math.floor(diffInDays)} days ago`;
    }
}

export const slugsTransform = (slug: string): string => {
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}
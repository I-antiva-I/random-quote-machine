/**
 * Enum represents the different display modes for a clock component
 * 
 * @enum {number} ClockMode
 * @property {number} INCREASING_24H - Displays the current time in 24-hour (HH:MM:SS) format
 * @property {number} INCREASING_12H - Displays the current time in 12-hour (HH:MM:SS) format with AM/PM
 * @property {number} DECREASING - Displays the time left until the next day in HH:MM:SS format
 * 
 */

export enum ClockMode 
{
  INCREASING_24H = 0,
  INCREASING_12H = 1,
  DECREASING = 2,
}
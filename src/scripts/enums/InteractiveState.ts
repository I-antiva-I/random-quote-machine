/**
 * Enum represents the different states, used by intractable components, such as buttons, checkboxes, and others
 * 
 * @enum {number} InteractiveState
 * @property {number} DEFAULT - A default state for a component
 * @property {number} HOVERED - A state, triggered on mouse enter event
 * @property {number} PRESSED - A state, triggered on mouse down event
 * 
 */

export enum InteractiveState 
{
  DEFAULT = 0,
  HOVERED = 1,
  PRESSED = 2,
}

export function getInteractiveStateName(state: InteractiveState): string 
{
  return InteractiveState[state];
}
import { useRef, useEffect, useState, type RefObject } from 'react';

// Key combination types
type ModifierKey = 'ctrl' | 'shift' | 'alt' | 'meta';
type KeyCode = 
  | 'enter' | 'escape' | 'space' | 'tab' | 'backspace' | 'delete'
  | 'arrowup' | 'arrowdown' | 'arrowleft' | 'arrowright'
  | 'home' | 'end' | 'pageup' | 'pagedown'
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
  | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12';

type KeyCombo = KeyCode | `${ModifierKey}+${KeyCode}` | `${ModifierKey}+${ModifierKey}+${KeyCode}`;

// Event handler types
type KeyboardEventHandler = (event: KeyboardEvent) => void;
type MouseEventHandler = (event: MouseEvent) => void;
type FocusEventHandler = (event: FocusEvent) => void;
type TouchEventHandler = (event: TouchEvent) => void;

// Configuration interfaces
interface KeyboardConfig {
  [key: string]: KeyboardEventHandler;
}

interface MouseConfig {
  onEnter?: MouseEventHandler;
  onLeave?: MouseEventHandler;
  onClick?: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onContextMenu?: MouseEventHandler;
  onWheel?: (event: WheelEvent) => void;
}

interface FocusConfig {
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onFocusIn?: FocusEventHandler;
  onFocusOut?: FocusEventHandler;
}

interface TouchConfig {
  onTouchStart?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onTouchCancel?: TouchEventHandler;
}

interface DragConfig {
  onDragStart?: (event: DragEvent) => void;
  onDrag?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
}

// Main configuration interface
interface ElementInteractionConfig {
  keys?: KeyboardConfig;
  mouse?: MouseConfig;
  focus?: FocusConfig;
  touch?: TouchConfig;
  drag?: DragConfig;
  disabled?: boolean;
  preventDefault?: {
    keyboard?: boolean;
    mouse?: boolean;
    focus?: boolean;
    touch?: boolean;
    drag?: boolean;
  };
  stopPropagation?: {
    keyboard?: boolean;
    mouse?: boolean;
    focus?: boolean;
    touch?: boolean;
    drag?: boolean;
  };
}

// State interface
interface InteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isDragging: boolean;
  isTouched: boolean;
  lastKeyPressed: string | null;
  lastEventType: string | null;
}

// Return type
export interface UseElementInteractionsReturn<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  state: InteractionState;
  updateState: (updates: Partial<InteractionState>) => void;
}

// Utility function to normalize key combinations
const normalizeKeyCombo = (event: KeyboardEvent): string => {
  const modifiers: string[] = [];
  
  if (event.ctrlKey || event.metaKey) modifiers.push('ctrl');
  if (event.shiftKey) modifiers.push('shift');
  if (event.altKey) modifiers.push('alt');
  
  const key = event.key.toLowerCase();
  
  return modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
};

// Main hook
const useElementInteractions = <T extends HTMLElement = HTMLElement>(
  config: ElementInteractionConfig
): UseElementInteractionsReturn<T> => {
  const elementRef = useRef<T>(null);
  const [state, setState] = useState<InteractionState>({
    isHovered: false,
    isFocused: false,
    isPressed: false,
    isDragging: false,
    isTouched: false,
    lastKeyPressed: null,
    lastEventType: null
  });

  const {
    keys = {},
    mouse = {},
    focus = {},
    touch = {},
    drag = {},
    disabled = false,
    preventDefault = {},
    stopPropagation = {}
  } = config;

  const updateState = (updates: Partial<InteractionState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (disabled || !elementRef.current) return;
    
    const element = elementRef.current;
    
    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCombo = normalizeKeyCombo(e) as KeyCombo;
      
      if (keys[keyCombo]) {
        if (preventDefault.keyboard) e.preventDefault();
        if (stopPropagation.keyboard) e.stopPropagation();
        
        setState(prev => ({ 
          ...prev, 
          lastKeyPressed: keyCombo, 
          lastEventType: 'keydown' 
        }));
        
        keys[keyCombo]!(e);
      }
    };

    // Mouse handlers
    const handleMouseEnter = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isHovered: true, 
        lastEventType: 'mouseenter' 
      }));
      
      mouse.onEnter?.(e);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isHovered: false, 
        lastEventType: 'mouseleave' 
      }));
      
      mouse.onLeave?.(e);
    };

    const handleClick = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'click' }));
      mouse.onClick?.(e);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'doubleclick' }));
      mouse.onDoubleClick?.(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isPressed: true, 
        lastEventType: 'mousedown' 
      }));
      
      mouse.onMouseDown?.(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isPressed: false, 
        lastEventType: 'mouseup' 
      }));
      
      mouse.onMouseUp?.(e);
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'contextmenu' }));
      mouse.onContextMenu?.(e);
    };

    const handleWheel = (e: WheelEvent) => {
      if (preventDefault.mouse) e.preventDefault();
      if (stopPropagation.mouse) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'wheel' }));
      mouse.onWheel?.(e);
    };

    // Focus handlers
    const handleFocus = (e: FocusEvent) => {
      if (preventDefault.focus) e.preventDefault();
      if (stopPropagation.focus) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isFocused: true, 
        lastEventType: 'focus' 
      }));
      
      focus.onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent) => {
      if (preventDefault.focus) e.preventDefault();
      if (stopPropagation.focus) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isFocused: false, 
        lastEventType: 'blur' 
      }));
      
      focus.onBlur?.(e);
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (preventDefault.focus) e.preventDefault();
      if (stopPropagation.focus) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'focusin' }));
      focus.onFocusIn?.(e);
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (preventDefault.focus) e.preventDefault();
      if (stopPropagation.focus) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'focusout' }));
      focus.onFocusOut?.(e);
    };

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (preventDefault.touch) e.preventDefault();
      if (stopPropagation.touch) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isTouched: true, 
        lastEventType: 'touchstart' 
      }));
      
      touch.onTouchStart?.(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefault.touch) e.preventDefault();
      if (stopPropagation.touch) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'touchmove' }));
      touch.onTouchMove?.(e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (preventDefault.touch) e.preventDefault();
      if (stopPropagation.touch) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isTouched: false, 
        lastEventType: 'touchend' 
      }));
      
      touch.onTouchEnd?.(e);
    };

    const handleTouchCancel = (e: TouchEvent) => {
      if (preventDefault.touch) e.preventDefault();
      if (stopPropagation.touch) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isTouched: false, 
        lastEventType: 'touchcancel' 
      }));
      
      touch.onTouchCancel?.(e);
    };

    // Drag handlers
    const handleDragStart = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isDragging: true, 
        lastEventType: 'dragstart' 
      }));
      
      drag.onDragStart?.(e);
    };

    const handleDrag = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'drag' }));
      drag.onDrag?.(e);
    };

    const handleDragEnd = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ 
        ...prev, 
        isDragging: false, 
        lastEventType: 'dragend' 
      }));
      
      drag.onDragEnd?.(e);
    };

    const handleDragEnter = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'dragenter' }));
      drag.onDragEnter?.(e);
    };

    const handleDragLeave = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'dragleave' }));
      drag.onDragLeave?.(e);
    };

    const handleDragOver = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'dragover' }));
      drag.onDragOver?.(e);
    };

    const handleDrop = (e: DragEvent) => {
      if (preventDefault.drag) e.preventDefault();
      if (stopPropagation.drag) e.stopPropagation();
      
      setState(prev => ({ ...prev, lastEventType: 'drop' }));
      drag.onDrop?.(e);
    };

    // Add event listeners
    element.addEventListener('keydown', handleKeyDown);
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);
    element.addEventListener('dblclick', handleDoubleClick);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('contextmenu', handleContextMenu);
    element.addEventListener('wheel', handleWheel);
    
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    element.addEventListener('focusin', handleFocusIn);
    element.addEventListener('focusout', handleFocusOut);
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchCancel);
    
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('drag', handleDrag);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
      element.removeEventListener('dblclick', handleDoubleClick);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('contextmenu', handleContextMenu);
      element.removeEventListener('wheel', handleWheel);
      
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('focusin', handleFocusIn);
      element.removeEventListener('focusout', handleFocusOut);
      
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
      
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('drag', handleDrag);
      element.removeEventListener('dragend', handleDragEnd);
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('drop', handleDrop);
    };
  }, [keys, mouse, focus, touch, drag, disabled, preventDefault, stopPropagation]);

  return {
    ref: elementRef,
    state,
    updateState
  };
};


const KEYS = {
  // Navigation
  ENTER: 'enter' as const,
  ESCAPE: 'escape' as const,
  SPACE: 'space' as const,
  TAB: 'tab' as const,
  BACKSPACE: 'backspace' as const,
  DELETE: 'delete' as const,
  
  // Arrows
  ARROW_UP: 'arrowup' as const,
  ARROW_DOWN: 'arrowdown' as const,
  ARROW_LEFT: 'arrowleft' as const,
  ARROW_RIGHT: 'arrowright' as const,
  
  // Page navigation
  HOME: 'home' as const,
  END: 'end' as const,
  PAGE_UP: 'pageup' as const,
  PAGE_DOWN: 'pagedown' as const,
  
  // Letters
  A: 'a' as const, B: 'b' as const, C: 'c' as const, D: 'd' as const,
  E: 'e' as const, F: 'f' as const, G: 'g' as const, H: 'h' as const,
  I: 'i' as const, J: 'j' as const, K: 'k' as const, L: 'l' as const,
  M: 'm' as const, N: 'n' as const, O: 'o' as const, P: 'p' as const,
  Q: 'q' as const, R: 'r' as const, S: 's' as const, T: 't' as const,
  U: 'u' as const, V: 'v' as const, W: 'w' as const, X: 'x' as const,
  Y: 'y' as const, Z: 'z' as const,
  
  // Numbers
  ZERO: '0' as const, ONE: '1' as const, TWO: '2' as const, THREE: '3' as const,
  FOUR: '4' as const, FIVE: '5' as const, SIX: '6' as const, SEVEN: '7' as const,
  EIGHT: '8' as const, NINE: '9' as const,
  
  // Function keys
  F1: 'f1' as const, F2: 'f2' as const, F3: 'f3' as const, F4: 'f4' as const,
  F5: 'f5' as const, F6: 'f6' as const, F7: 'f7' as const, F8: 'f8' as const,
  F9: 'f9' as const, F10: 'f10' as const, F11: 'f11' as const, F12: 'f12' as const,
} as const;

const MODIFIERS = {
  CTRL: 'ctrl' as const,
  SHIFT: 'shift' as const,
  ALT: 'alt' as const,
  META: 'meta' as const,
} as const;

const MOUSE_EVENTS = {
  ENTER: 'onEnter' as const,
  LEAVE: 'onLeave' as const,
  CLICK: 'onClick' as const,
  DOUBLE_CLICK: 'onDoubleClick' as const,
  MOUSE_DOWN: 'onMouseDown' as const,
  MOUSE_UP: 'onMouseUp' as const,
  CONTEXT_MENU: 'onContextMenu' as const,
  WHEEL: 'onWheel' as const,
} as const;

const FOCUS_EVENTS = {
  FOCUS: 'onFocus' as const,
  BLUR: 'onBlur' as const,
  FOCUS_IN: 'onFocusIn' as const,
  FOCUS_OUT: 'onFocusOut' as const,
} as const;

const TOUCH_EVENTS = {
  START: 'onTouchStart' as const,
  MOVE: 'onTouchMove' as const,
  END: 'onTouchEnd' as const,
  CANCEL: 'onTouchCancel' as const,
} as const;

const DRAG_EVENTS = {
  START: 'onDragStart' as const,
  DRAG: 'onDrag' as const,
  END: 'onDragEnd' as const,
  ENTER: 'onDragEnter' as const,
  LEAVE: 'onDragLeave' as const,
  OVER: 'onDragOver' as const,
  DROP: 'onDrop' as const,
} as const;


export const CONFIG = {
  FOCUS: FOCUS_EVENTS,
  MOUSE: MOUSE_EVENTS,
  TOUCH: TOUCH_EVENTS,
  DRAG: DRAG_EVENTS,
  KEYS,
  MODIFIERS,
  MOUSE_EVENTS,
  TOUCH_EVENTS,
}


export default useElementInteractions;
export const FORMATS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  LINK: 'link',
  IMAGE: 'image',
  LIST: 'list',
  CODE: 'code',
  QUOTE: 'quote',
  CODE_BLOCK: 'code-block',
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  LIST_ITEM: 'list-item',
  ORDERED_LIST: 'ordered-list',
  UNORDERED_LIST: 'unordered-list',
} as const

export type Format = (typeof FORMATS)[keyof typeof FORMATS]

// Map formats to execCommand commands
export const COMMANDS: Record<Format, string> = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strikethrough: 'strikeThrough',
  link: 'createLink',
  image: 'insertImage',
  list: 'insertUnorderedList',
  code: 'formatBlock',
  quote: 'formatBlock',
  'code-block': 'formatBlock',
  heading: 'formatBlock',
  paragraph: 'formatBlock',
  'list-item': 'insertUnorderedList',
  'ordered-list': 'insertOrderedList',
  'unordered-list': 'insertUnorderedList',
}

// Map formats to HTML tags (for state detection)
export const TAGS: Record<Format, string> = {
  bold: 'strong',
  italic: 'em',
  underline: 'u',
  strikethrough: 's',
  link: 'a',
  image: 'img',
  list: 'ul',
  code: 'code',
  quote: 'blockquote',
  'code-block': 'pre',
  heading: 'h1',
  paragraph: 'p',
  'list-item': 'li',
  'ordered-list': 'ol',
  'unordered-list': 'ul',
}

// Keyboard shortcuts
export const SHORTCUTS: Record<string, Format> = {
  'b': 'bold',
  'i': 'italic',
  'u': 'underline',
}
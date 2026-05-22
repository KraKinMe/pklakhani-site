import sanitizeHtml from "sanitize-html";

/** Strip unsafe HTML from rich-text blog content before save/render. */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "h2",
      "h3",
      "ol",
      "ul",
      "li",
      "a",
      "img",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "class", "style", "title"],
      img: ["src", "alt", "title", "class", "style"],
      span: ["class", "style"],
      p: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      ul: ["class", "style"],
      ol: ["class", "style"],
      li: ["class", "style"],
      blockquote: ["class", "style"],
      strong: ["class", "style"],
      em: ["class", "style"],
      u: ["class", "style"],
      s: ["class", "style"],
    },
  });
}

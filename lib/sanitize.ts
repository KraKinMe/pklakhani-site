import DOMPurify from "isomorphic-dompurify";

/** Strip unsafe HTML from rich-text blog content before save/render. */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
    ALLOWED_TAGS: [
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
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "title",
      "class",
      "style",
    ],
  });
}

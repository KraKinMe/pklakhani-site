export type CategoryOption = { _id: string; name: string; slug: string };

export type QuillEditor = {
  getSelection?: () => { index: number };
  insertEmbed?: (index: number, type: string, url: string) => void;
};

export type Options =
  & import('./mdast-util-gfm.js').Options
  & import('./micromark-extension-gfm.js').Options

export default function remarkGfmNoAutoLink(options: Options): void
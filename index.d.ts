export type Options =
  & import('./mdast-util-gfm').Options
  & import('./micromark-extension-gfm').Options

export default function remarkGfmNoAutoLink(options: Options): void
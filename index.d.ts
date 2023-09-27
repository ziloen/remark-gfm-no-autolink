export type Options = import('mdast-util-gfm-table').Options & import('micromark-extension-gfm-strikethrough').Options
export default function remarkGfmNoAutolink(options?: Options | undefined):
  | void
// | import('unified').Transformer<import('mdast').Root, import('mdast').Root>
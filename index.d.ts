export type Options = import('micromark-extension-gfm').Options & import('mdast-util-gfm').Options
export default function remarkGfmNoAutolink(options?: Options | undefined):
  | void
  | import('unified').Transformer<import('mdast').Root, import('mdast').Root>
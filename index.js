import { gfm } from './micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from './mdast-util-gfm'

/**
 * @import { Root } from "mdast"
 * @import { Processor } from "unified"
 */

/**
 * @typedef {import("./mdast-util-gfm").Options & import("./micromark-extension-gfm").Options} Options
 */


/** @type {Options} */
const emptyOptions = {}

/**
 * @this {Processor<Root>}
 * Add support GFM (autolink literals, footnotes, strikethrough, tables,
 * tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfmNoAutoLink(options) {
  const self = this
  const settings = options || emptyOptions
  const data = self.data()

  const micromarkExtensions = data.micromarkExtensions ??= []
  const fromMarkdownExtensions = data.fromMarkdownExtensions ??= []
  const toMarkdownExtensions = data.toMarkdownExtensions ??= []

  micromarkExtensions.push(gfm(settings))
  fromMarkdownExtensions.push(gfmFromMarkdown())
  toMarkdownExtensions.push(gfmToMarkdown(settings))
}
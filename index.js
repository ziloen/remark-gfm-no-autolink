import {
  gfmFootnoteFromMarkdown,
  gfmFootnoteToMarkdown
} from 'mdast-util-gfm-footnote'
import {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown
} from 'mdast-util-gfm-strikethrough'
import {
  gfmTableFromMarkdown,
  gfmTableToMarkdown
} from 'mdast-util-gfm-table'
import {
  gfmTaskListItemFromMarkdown,
  gfmTaskListItemToMarkdown
} from 'mdast-util-gfm-task-list-item'
import { gfmFootnote } from 'micromark-extension-gfm-footnote'
import {
  gfmStrikethrough
} from 'micromark-extension-gfm-strikethrough'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item'
import { combineExtensions } from 'micromark-util-combine-extensions'

/**
 * @typedef {import("micromark-extension-gfm-strikethrough").Options} GfmStrikethroughOptions
 * @typedef {import("mdast-util-gfm-table").Options} GfmTableOptions
 * @typedef {GfmStrikethroughOptions & GfmTableOptions} Options
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 */



/**
 * Create an extension for `micromark` to enable GFM syntax.
 *
 * @param {GfmStrikethroughOptions | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-strikethrough`.
 * @returns {import('micromark-util-types').Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   syntax.
 */
function gfm(options) {
  return combineExtensions([
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable(),
    gfmTaskListItem()
  ])
}


/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @returns {Array<FromMarkdownExtension>}
 *   Extension for `mdast-util-from-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmFromMarkdown() {
  return [
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown(),
    gfmTaskListItemFromMarkdown()
  ]
}



/**
 * @param {GfmTableOptions | null | undefined} [options] 
 * @returns {ToMarkdownExtension}
 */
/**
 * Create an extension for `mdast-util-to-markdown` to enable GFM (autolink
 * literals, footnotes, strikethrough, tables, tasklists).
 *
 * @param {import('mdast-util-gfm-table').Options | null | undefined} [options]
 *   Configuration.
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown` to enable GFM (autolink literals,
 *   footnotes, strikethrough, tables, tasklists).
 */
export function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown()
    ]
  }
}

/** @type {Options} */
const emptyOptions = {}

/**
 * Add support GFM (footnotes, strikethrough, tables, tasklists).
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfmNoAutoLink(options) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const settings = options || emptyOptions
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(gfm(settings))
  fromMarkdownExtensions.push(gfmFromMarkdown())
  toMarkdownExtensions.push(gfmToMarkdown(settings))
}
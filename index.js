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
 * @param {GfmStrikethroughOptions} options 
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
 * @returns {FromMarkdownExtension[]}
 */
function gfmFromMarkdown() {
  return [
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown(),
    gfmTableFromMarkdown,
    gfmTaskListItemFromMarkdown()
  ]
}



/**
 * @param {GfmTableOptions | null | undefined} [options] 
 * @returns {ToMarkdownExtension}
 */
function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown(),
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown()
    ]
  }
}



/**
 * 
 * @this {import('unified').Processor}
 * @param {Options} options 
 * @type {import('unified').Plugin<[Options?] | void[], Root>}
 */
export default function remarkGfmNoAutolink(options = {}) {
  const data = this.data()

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
    const list = /** @type {unknown[]} */ (data[field] ||= [])
    list.push(value)
  }

  add('micromarkExtensions', gfm(options))
  add('fromMarkdownExtensions', gfmFromMarkdown())
  add('toMarkdownExtensions', gfmToMarkdown(options))
}
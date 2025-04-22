/**
 * @import {Extension, HtmlExtension} from 'micromark-util-types'
 */

/**
 * @typedef {import("micromark-extension-gfm-strikethrough").Options} Options
 * @typedef {import("micromark-extension-gfm-footnote").HtmlOptions} HtmlOptions
 */

import {
  combineExtensions,
  combineHtmlExtensions
} from 'micromark-util-combine-extensions'

import { gfmFootnote, gfmFootnoteHtml } from 'micromark-extension-gfm-footnote'
import {
  gfmStrikethrough,
  gfmStrikethroughHtml
} from 'micromark-extension-gfm-strikethrough'
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table'
import { gfmTagfilterHtml } from 'micromark-extension-gfm-tagfilter'
import {
  gfmTaskListItem,
  gfmTaskListItemHtml
} from 'micromark-extension-gfm-task-list-item'

/**
 * Create an extension for `micromark` to enable GFM syntax.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-strikethrough`.
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions` to enable GFM
 *   syntax.
 */
export function gfm(options) {
  return combineExtensions([
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable(),
    gfmTaskListItem()
  ])
}

/**
 * Create an extension for `micromark` to support GFM when serializing to HTML.
 *
 * @param {HtmlOptions | null | undefined} [options]
 *   Configuration (optional).
 *
 *   Passed to `micromark-extens-gfm-footnote`.
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to
 *   support GFM when serializing to HTML.
 */
export function gfmHtml(options) {
  return combineHtmlExtensions([
    gfmFootnoteHtml(options),
    gfmStrikethroughHtml(),
    gfmTableHtml(),
    gfmTagfilterHtml(),
    gfmTaskListItemHtml()
  ])
}
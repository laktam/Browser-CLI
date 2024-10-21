/**
 * @typedef {Object} CdCommand
 * @property {'cd'} command - move to a tab
 * @property {number[]} arguments - the first argument contain the tab index to move to.
 */

/**
 * @typedef {Object} RmCommand
 * @property {'rm'} command - close a group or a tab
 * @property {string} --g - the group to close.
 * @property {number[]} arguments - the first argument contain the tab to close
 */

/**
 * @typedef {Object} FindCommand
 * @property {'find'} command - search tabs with a keyword
 * @property {string[]} arguments - the search keyword
 */

/**
 * @typedef {RmCommand | FindCommand | CdCommand} CommandObj
 */
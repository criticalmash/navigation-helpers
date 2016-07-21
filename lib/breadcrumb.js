'use strict';

var _ = require('lodash');


/**
 * recursively Searches a menu structure for items
 * flagged as current or active and returns them as 
 * an array.
 * 
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
function recursiveSearch (item) {
  //console.log('item', item);
  var results = [];
  var items = item.items;
  for (var i = 0; i < items.length; i++) {
    if(items[i].isCurrentPage){
      return items[i];
    }
    if(items[i].isActive){
      results = _.concat(results, items[i], recursiveSearch(items[i]));
    }
  }
  return results;
}

/**
 * Block Helper that searches a navigation object, menu or menu branch for menuitems
 * flagged as `isActive` or `isCurrentPage` and passes them to the inner block to 
 * create a breadcurmb trail
 *
 * ```handlebars
 * {{#breadcrumb navigation.main}}
 *   <a src='{{url}}''>{{title}}</a> 
 * {{\breadcrumb}}
 * ```
 * @param  {[type]} collection [description]
 * @param  {[type]} options    [description]
 * @return {[type]}            [description]
 */
function breadcrumb (collection, options) {
  var results = recursiveSearch(collection);
  // console.log('results', results);
  var resultSet = '';
  _.forEach(results, function (result) {
    resultSet += options.fn(result);
  });

  return resultSet;
}

module.exports = breadcrumb;
'use strict';

var _ = require('lodash');

var util = require('./util.js');

/**
 * A handlebars helper to search a colloection
 *
 * Parameters
 * an collection (array of objects) you want to search
 *
 * Options object
 *   key: the object property you want to search on
 *   value: what that key should equal
 *   sortBy: optional sorting attribute
 *   sortDir: optional sort order (asc, desc)
 *   
 * ```html
 *  {{#collectionQuery navigation.main.items key='linkId' value='main-portfolio' sortBy='data.menu-sortdate' sortDir='desc'}}
 *    <li class="portfolio-item" data-linkid="{{linkId}}">
 *      <a href="{{{url}}}" >
 *        <img src="/img/portfolio/small/{{data.picture}}" alt="">
 *        {{{title}}}
 *      </a>
 *    </li>
 *  {{/collectionQuery}}
 * ```
 * @return {String}
 * @block
 * @api public
 */
function collectionQuery(collection, options) {
  // console.log('hash', options.hash);
  options = options || {};
  var hash = options.hash || {};
  // console.log('hash', hash);
  // unpack options
  var results = {test: 'no results'};
  var key = hash.key || false;
  var value = hash.value || false;
  var sortBy = hash.sortBy || false;
  var sortDir = hash.sortDir || false;
  var limit = hash.limit || false;

  // search the collection
  if (key) {
    var query = {};
    query[key] = value;
    results = _.filter(collection, function (item) {
      return item[key] === value;
    });
  }else{
    results = _.clone(collection);
  }
  

  // sort and limit the result set, if needed
  if (sortBy && results) {
    results = results.sort(function (a, b) {
      var aProp = util.getDescendantProp(a, sortBy);
      var bProp = util.getDescendantProp(b, sortBy);
      if (aProp > bProp) {
        return 1;
      } else {
        if (aProp < bProp) {
          return -1;
        }
      }
      return 0;
    });
    if (sortDir === 'desc') {
      results = results.reverse();
    }
  }

  if (limit) {
    results = results.slice(0, limit);
  }

  // return results
  
  var resultSet = '';
  _.forEach(results, function (result) {
    resultSet += options.fn(result);
  });

  return resultSet;
}

module.exports = collectionQuery;
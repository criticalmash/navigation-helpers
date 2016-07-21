# navigation-helpers
Template helpers for [Assemble Navigation](https://github.com/criticalmash/assemble-navigation)

Assemble-Navigation is a middleware collection for use with [Assemble](https://github.com/assemble/assemble)
to generate and inject hierarchal navigation data into a page's context. That page can then use a template or partial to build any kind of menu.

This collection of template helpers compliments Assemble-Navigation making it easier to create menus and breadcrumb trails.

See Assemble-Navigation's [readme](https://github.com/criticalmash/assemble-navigation) for more information on menu schemas and how to use them.

> Note: a demo site for Assemble-Navigation and these helpers are in the works. That site will also have some more in-depth tutorials.

# Helpers

## handlebars-collectionquery
Block helper for querying menus and selecting the children of a submenu. Will create an array of menu items that can then be rendered. Includes sorting. 

### Sample Usage

#### Parameters
* collection (array of menuitems) you want to search. Typically, you'll want to query the top items array of a menu (`navigation.main.items`, `navigation.footer.items`, etc.).
* key (string): the object property you want to search on.
* value (string): what that key should equal
* sortBy (string): optional sorting attribute
* sortDir (string): optional sort order (asc, desc)
* property ('string'): determines what is passed to the inner block. If you just want the matching menu item, leave this out. If you want the children menu items of the matching block, use 'items'.
* includeParent (boolean): When using property, the index page (AKA the parent) is left out of the results by default. Set this to true to include the parent in the items passed to the inner template.

```html
<ul class="sidebar-menu">
  {{#collectionQuery navigation.main.items key='linkId' value='about-index' includeParent=true property='items' sortBy='title' sortDir='asc'}}
  <li><a href="{{{url}}}" >{{{title}}}</a></li>
{{/collectionQuery}}
<ul>
```

## breadcrumb
This helper parses a navigation menu and returns any items in the current page's active path (the page and it's parent, grandparent, etc.) to the inner block.

You can then output them using in any format you like.

```handlebars
{{#breadcrumb navigation.main}}
    {{#if isActive}}
       <a href='{{url}}'>{{title}}</a> &raquo;
    {{else}}
        {{title}}
    {{/if}}
{{/breadcrumb}}
```

# Using with Assemble
If you have Assemble and Assemble Navigation already setup and working, then you just need to configure the helper.

Install via npm...

```
npm i navigation-helpers --save
```

Add the helper to Assemble..

```js
app.helpers(require('navigation-helpers'));
```

## Release History
### v0.1.0
Beta release. Future releases will likely add new helpers. I'd expect the APIs for existing helpers to remain the same.

## Contributing and Issues
Feel free to submit issues or pull requests for [Navigation-Helpers](https://github.com/criticalmash/navigation-helpers/issues). Questions on use can also be submitted to the issue queue.

There's a suite of unit tests. ```mocha test/*-spec.js```

## License
© 2016 John O'Donnell (Critical Mash Inc.) Released under the [MIT license](https://github.com/criticalmash/navigation-helpers/blob/master/LICENSE).

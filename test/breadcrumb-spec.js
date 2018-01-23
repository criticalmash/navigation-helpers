'use strict';
/*eslint-env mocha*/
/*jshint expr: true*/
/*jshint multistr: true*/
var chai = require('chai');
var expect = chai.expect;
var hbs = require('handlebars');

var breadcrumb = require('../').breadcrumb;
hbs.registerHelper('breadcrumb', breadcrumb);

var noActivePath = require('./fixtures/chamberTest.json');
var activePath = require('./fixtures/pathTest.json');
var indexTest = require('./fixtures/indexTest.json');

describe('breadcrumb', function () {
  it('should return nothing when there is no active path', function () {
    var source = '{{#breadcrumb navigation.main}} {{this}} {{/breadcrumb}}';
    var template = hbs.compile(source);
    var output = template({navigation: noActivePath.menus});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('');
  });

  it('should find and render items in active path', function () {
    var source = '{{#breadcrumb navigation.main}}{{title}} {{/breadcrumb}}';
    var template = hbs.compile(source);
    var output = template({navigation: activePath.menus});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('Media News Press Release ');
  });

  it('should find and render one item for index page', function () {
    var source = '{{#breadcrumb navigation.main}}{{title}} {{/breadcrumb}}';
    var template = hbs.compile(source);
    var output = template({navigation: indexTest.menus});

    console.log(JSON.stringify(output, null, '\t'));
    expect(output).contains('Chamberfest 2016 Artists');
  });
});
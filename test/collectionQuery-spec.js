'use strict';
/*eslint-env mocha*/
/*jshint expr: true*/
/*jshint multistr: true*/
var chai = require('chai');
var expect = chai.expect;
var hbs = require('handlebars');

var collectionQuery = require('../').collectionQuery;
hbs.registerHelper('collectionQuery', collectionQuery);

var alpha = [
  {name: 'a', type: 'vowel'},
  {name: 'b', type: 'consonant'},
  {name: 'c', type: 'consonant'},
  {name: 'd', type: 'consonant'},
  {name: 'e', type: 'vowel'},
  {name: 'f', type: 'consonant'},
  {name: 'g', type: 'consonant'}
];

var compound = [
  {name: 'o', props: {num: 2}},
  {name: 'h', props: {num: 3}},
  {name: 'od', props: {num: 5}},
  {name: 'j', props: {num: 1}},
  {name: 'n', props: {num: 4}},
];

var arrayMatch = [
  {name: 'a', list: ['apple', 'banana', 'cherry']},
  {name: 'b', list: ['cat', 'dog', 'hamster']}
];

var chamberTest = require('./fixtures/chamberTest.json');

describe('collectionQuery', function () {

  xit('should respond with empty result set when undefined', function (){
    var source = '{{#collectionQuery }} {{this}} {{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template();

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('');
  });

  it('should iterate over an array, exposing objects as context.', function() {
    var arr = [{name: 'a'}, {name: 'b'}, {name: 'c'}];

    var source = '{{#collectionQuery arr}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: arr});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('abc');

    //fn({arr: arr}).should.equal('abc');
  });

  it('should filter an array based on object attributes', function (){
    var source = '{{#collectionQuery arr key=\'type\' value=\'consonant\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('bcdfg');
  });

  it('should filter an array based on nested object attributes', function (){
    var source = '{{#collectionQuery arr key=\'props.num\' value=3}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: compound});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('h');
  });

  it('should sort an array based on object attributes', function (){
    var source = '{{#collectionQuery arr sortBy=\'type\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('bcdfgae');
  });

  it('should sort descending an array based on object attributes', function (){
    var source = '{{#collectionQuery arr sortBy=\'type\' sortDir=\'desc\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('eagfdcb');
  });

  it('should limit the number of array items', function (){
    var source = '{{#collectionQuery arr limit=\'4\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('abcd');
  });

  it('should sort an array based on child object value', function (){
    var source = '{{#collectionQuery arr sortBy=\'props.num\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: compound});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('johnod');
  });

  it('should do it all', function () {
    var source = '{{#collectionQuery arr key=\'type\' value=\'consonant\' sortBy=\'name\' sortDir=\'desc\' limit=\'3\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('gfd');
  });

  it('should work with assemble-navigation objects', function () {
    var source = '{{#collectionQuery navigation.main.items key=\'linkId\' value=\'2016-festival-index\' property=\'items\' sortBy=\'title\' sortDir=\'asc\' limit=\'3\'}}{{linkId}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({navigation: chamberTest.menus});

    // console.log('menu items', JSON.stringify(chamberTest, null, '\t'));
    // console.log('helper output', JSON.stringify(output, null, '\t'));
    expect(output).to.equal('2016-festival-nosh-noon2016-festival-calendar2016-festival-schumann-fantasies');
  });

  it('should include parent item in result set if desired', function () {
    var source = '{{#collectionQuery navigation.main.items key=\'linkId\' value=\'about-index\' includeParent=true property=\'items\' sortBy=\'title\'}}{{linkId}} {{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({navigation: chamberTest.menus});

    // console.log('menu items', JSON.stringify(chamberTest, null, '\t'));
    // console.log('helper output', JSON.stringify(output, null, '\t'));
    expect(output).to.equal('about-index about-message-from-the-directors about-staff-board ');
  });

  it('should handle a query inside another query block');

  it('should be able to match an array that contains the given value', function () {
    var source = '{{#collectionQuery items inlist=\'list\' value=\'apple\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({items: arrayMatch});

    console.log('array match helper output', JSON.stringify(output, null, '\t'));
    expect(output).to.equal('a');
  });
});
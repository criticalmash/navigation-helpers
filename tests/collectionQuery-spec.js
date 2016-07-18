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
    var source = '{{#collectionQuery arr limit=\'3\'}}{{name}}{{/collectionQuery}}';
    var template = hbs.compile(source);
    var output = template({arr: alpha});

    // console.log(JSON.stringify(output, null, '\t'));
    expect(output).to.equal('abc');
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

  it('should work with assemble-navigation objects');

  it('should handle a query inside another query block');

    
});
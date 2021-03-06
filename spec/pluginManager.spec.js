require( "should" );
require( "should" );
var _ = require( "underscore" );
var machina = require( "machina" );
var postal = require( "postal" );
var path = require( "path" );
var fs = require( "../src/fs.mock.js" )( _, path );
var scheduler = require( "../src/scheduler.js" )( _ );
var events = require( "../src/eventAggregator.js" )( _ );
var bus = require( "../src/bus.js")( _, postal );
var anvil = require( "../src/anvil.js" )( _, scheduler, fs, events, bus );
require( "../src/utility.js")( _, anvil );
var plugin = require( "../src/plugin.js" )( _, anvil );
var log = require( "./log.mock.js" )( anvil );

var pluginManager = require( "../src/pluginManager.js" )( _, anvil );

describe( "when getting the list of loaded plugins", function() {
	var list = [];

	before( function( done ) {
		pluginManager.getEnabledPlugins( function( instances ) {
			list = instances;
			done();
		} );
	} );

	it( "should return the list of plugins installed", function() {
		_.isEqual( list, [] ).should.not.ok;
		list.length.should.equal( 9 );
	} );
} );

describe( "when adding a new plugin", function() {
	var list = [],
		err;

	before( function( done ) {
		pluginManager.addPlugin( "testPlugin", function() {
			pluginManager.getEnabledPlugins( function( instances ) {
				list = instances;
				done();
			} );
		} );
	} );
	
	it( "should return the list of plugins installed", function() {
		//list[ list.length - 1 ].name.should.equal( "testPlugin" );
		( err == undefined ).should.ok;
		list.length.should.equal( 10 );
	} );
} );

describe( "when adding an existing plugin", function() {
	var list = [],
		err;

	before( function( done ) {
		pluginManager.addPlugin( "testPlugin", function() {
			pluginManager.getEnabledPlugins( function( instances ) {
				list = instances;
				done();
			} );
		} );
	} );
	

	it( "should return the list of plugins installed", function() {
		list[ list.length - 1 ].should.equal( "testPlugin" );
		( err == undefined ).should.ok;
		list.length.should.equal( 10 );
	} );
} );

describe( "when removing an existing plugin", function() {
	var list = [],
		err;

	before( function( done ) {
		pluginManager.removePlugin( "testPlugin", function() {
			pluginManager.getEnabledPlugins( function( instances ) {
				list = instances;
				done();
			} );
		} );
	} );
	

	it( "should return the list of plugins except the removed one", function() {
		_.isEqual( list, [] ).should.not.ok;
		( err == undefined ).should.ok;
		list.length.should.equal( 9 );
	} );
} );

describe( "when removing a missing plugin", function() {
	var list = [],
		err;

	before( function( done ) {
		pluginManager.removePlugin( "lulzImNot4Real", function() {
			pluginManager.getEnabledPlugins( function( instances ) {
				list = instances;
				done();
			} );
		} );
	} );
	

	it( "should return the list of plugins installed", function() {
		_.isEqual( list, [] ).should.not.ok;
		( err == undefined ).should.ok;
		list.length.should.equal( 9 );
	} );
} );
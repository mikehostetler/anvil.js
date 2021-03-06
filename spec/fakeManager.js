var fakeManagerFactory = function( _, anvil ) {
	
	var fakeManager = {
		plugins: [],
		checkDependencies: function( dependencies, done ) {
			done();
		},
		getPlugins: function( done ) {
			_.each( this.plugins, function( plugin ) {
				anvil.raise( "plugin.loaded", plugin.instance );
			} );
			done( this.plugins );
		},
		getTasks: function( done ) {
			done();
		}
	};

	var pluginA = {
		name: "pluginA",
		activity: "test1",
		commander: [
			[ "-a --pa [value]", "a's description", "a" ]
		],
		prerequisites: [ "pluginC" ],
		config: {},

		configure: function( config, command, done ) {
			this.config = command.pa;
			anvil.config.activityOrder = [ "test1" ];
			done();
		},

		run: function( done ) {
			this.ran = true;
			done();
		}
	};

	var pluginB = {
		name: "pluginB",
		activity: "test1",
		prerequisites: [  ],

		run: function( done ) {
			this.ran = true;
			done();
		}
	};

	var pluginC = {
		name: "pluginC",
		activity: "test1",
		prerequisites: [ "pluginB" ],

		run: function( done ) {
			this.ran = true;
			done();
		}
	};

	_.bindAll( pluginA );
	_.bindAll( pluginB );
	_.bindAll( pluginC );
	_.bindAll( fakeManager );

	fakeManager.plugins = [
		{ name: "pluginA", instance: pluginA },
		{ name: "pluginB", instance: pluginB },
		{ name: "pluginC", instance: pluginC }
	];

	return fakeManager;
};

module.exports = fakeManagerFactory;
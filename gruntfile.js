module.exports = function (grunt) {

	var tsServerPath = 'src/server/';
	var tsClientPath = 'src/client/';

	grunt.initConfig({
		ts: {
			server: {
				src: ['dts/*.d.ts', tsServerPath + '**/*.ts'],
				outDir: "target/server",
				options: {
					module: 'commonjs'
				}
			},
			server_watch: {
				src: ['dts/*.d.ts', tsServerPath + '**/*.ts'],
				outDir: "target/server",
				options: {
					module: 'commonjs',
					fast: 'never'
				}
			},
			client: {
				src: [tsClientPath + '**/*.ts'],
				outDir: "target/client",
				options: {
					module: 'commonjs'
				}
			}
		},

		watch: {
			server: {
				files: [tsServerPath + '**/*.ts'],
				tasks: ['ts:server_watch'],
				options: {
					spawn: false
				}
			},
			client: {
				files: [tsClientPath + '**/*.ts'],
				tasks: ['ts:client'],
				options: {
					spawn: false
				}
			}
		},

		nodemon: {
			dev: {
				script: 'target/server/index.js',
				options: {
					env: {
						"NODE_ENV": "development",
						"NODE_CONFIG": "dev"
					},
					watch: ["target/server"],
					delay: 300
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch:server'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.event.on('watch', function (action, filepath) {
		// Update the config to only build the changed less file.
		console.log('!!!', action, filepath);
		//{src: filepath, dest: './library/css/' + path.basename(filepath, '.less') + '.css'}

		console.log('get0', grunt.config.get('ts.server_watch.src'));

		//grunt.config('ts.server.cwd', './server');
		//grunt.config('ts.server.dest', './server');
		//grunt.config('ts.server_watch.src', ['dts/*.d.ts', filepath]);

		console.log('get1', grunt.config.get('ts.server_watch.src'));
	});

	grunt.loadNpmTasks("grunt-nodemon");
	grunt.loadNpmTasks("grunt-concurrent")
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("default", ["ts:server", "concurrent"]);
};
module.exports = function (grunt) {

    var tsServerPath = 'src/server/'
    var tsClientScreenPath = 'src/client_screen/'
    var tsClientControlsPath = 'src/client_controls/'

    grunt.initConfig({
        ts: {
            server: {
                src: ['dts/server/*.d.ts', tsServerPath + '**/*.ts'],
                outDir: 'target/server',
                options: {
                    module: 'commonjs',
                    fast: 'never'
                }
            },
            client_screen: {
                src: ['dts/client/*.d.ts', tsClientScreenPath + '**/*.ts'],
                outDir: 'target/client_screen',
                options: {
                    module: 'amd',
                    fast: 'never'
                }
            },
            client_controls: {
                src: ['dts/client/*.d.ts', tsClientControlsPath + '**/*.ts'],
                outDir: 'target/client_controls',
                options: {
                    module: 'amd',
                    fast: 'never'
                }
            }
        },

        copy: {
            static: {
                files: [
                    {expand: true, cwd: 'static/', src: ['**'], dest: 'target/static'}
                ]
            }
        },

        requirejs: {
            client_controls: {
                options: {
                    baseUrl: 'target/client_controls',
                    optimize: 'none',
                    name: 'index',
                    out: 'target/static/scripts/controls.js'
                }
            },
            client_screen: {
                options: {
                    baseUrl: 'target/client_screen',
                    optimize: 'none',
                    name: 'index',
                    out: 'target/static/scripts/screen.js'
                }
            }
        },

        uglify: {
            options: {
                mangle: false,
                beautify: true
            },
            client_controls: {
                files: {
                    'target/static/scripts/controls.js': 'target/static/scripts/controls.js'
                }
            },
            client_screen: {
                files: {
                    'target/static/scripts/screen.js': 'target/static/scripts/screen.js'
                }
            }
        },

        watch: {
            options: {
                spawn: false
            },
            server: {
                files: [tsServerPath + '**/*.ts'],
                tasks: ['ts:server']

            },
            client_screen: {
                files: [tsClientScreenPath + '**/*.ts'],
                tasks: ['ts:client_screen', 'requirejs:client_screen', 'uglify:client_screen']
            },
            client_controls: {
                files: [tsClientControlsPath + '**/*.ts'],
                tasks: ['ts:client_controls', 'requirejs:client_controls', 'uglify:client_controls']
            },
            static: {
                files: ['static/**/*'],
                tasks: ['copy:static']
            }
        },

        nodemon: {
            dev: {
                script: 'target/server/index.js',
                options: {
                    env: {
                        'NODE_ENV': 'development',
                        'NODE_CONFIG': 'dev'
                    },
                    watch: ['target/server'],
                    delay: 300
                }
            }
        },

        clean: {
            target: ['target']
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch:server', 'watch:client_screen', 'watch:client_controls', 'watch:static'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    })
    /*
     grunt.event.on('watch', function (action, filepath) {
     // Update the config to only build the changed less file.
     console.log('!!!', action, filepath)
     //{src: filepath, dest: './library/css/' + path.basename(filepath, '.less') + '.css'}

     console.log('get0', grunt.config.get('ts.server_watch.src'))

     //grunt.config('ts.server.cwd', './server')
     //grunt.config('ts.server.dest', './server')
     //grunt.config('ts.server_watch.src', ['dts/*.d.ts', filepath])

     console.log('get1', grunt.config.get('ts.server_watch.src'))
     })*/

    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-ts')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    var compileTasks = ['clean:target', 'copy:static',
        'ts:server', 'ts:client_screen', 'ts:client_controls',
        'requirejs:client_screen', 'requirejs:client_controls',
        'uglify:client_screen', 'uglify:client_controls']

    grunt.registerTask('default', compileTasks.concat('concurrent'))
    grunt.registerTask('compile', compileTasks)
}
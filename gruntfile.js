module.exports = function (grunt) {

    var tsServerPath = 'src/server/'
    var tsClientScreenPath = 'src/screen/'
    var tsClientControlsPath = 'src/controls/'

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
            screen: {
                src: ['dts/client/*.d.ts', tsClientScreenPath + '**/*.ts'],
                outDir: 'target/screen',
                options: {
                    module: 'amd',
                    fast: 'never'
                }
            },
            controls: {
                src: ['dts/client/*.d.ts', tsClientControlsPath + '**/*.ts'],
                outDir: 'target/controls',
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
            controls: {
                options: {
                    baseUrl: 'target',
                    optimize: 'none',
                    name: 'controls/index',
                    out: 'target/static/scripts/controls.js'
                }
            },
            screen: {
                options: {
                    baseUrl: 'target',
                    optimize: 'none',
                    name: 'screen/index',
                    out: 'target/static/scripts/screen.js'
                }
            }
        },

        uglify: {
            options: {
                mangle: false,
                beautify: true
            },
            controls: {
                files: {
                    'target/static/scripts/controls.js': 'target/static/scripts/controls.js'
                }
            },
            screen: {
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
            screen: {
                files: [tsClientScreenPath + '**/*.ts'],
                tasks: ['ts:screen', 'requirejs:screen', 'uglify:screen']
            },
            controls: {
                files: [tsClientControlsPath + '**/*.ts'],
                tasks: ['ts:controls', 'requirejs:controls', 'uglify:controls']
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
                tasks: ['nodemon', 'watch:server', 'watch:screen', 'watch:controls', 'watch:static'],
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
        'ts:server', 'ts:screen', 'ts:controls',
        'requirejs:screen', 'requirejs:controls',
        'uglify:screen', 'uglify:controls']

    grunt.registerTask('default', compileTasks.concat('concurrent'))
    grunt.registerTask('compile', compileTasks)
}
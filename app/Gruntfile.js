module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // CSS
        cssmin: {
            app:{
                
                options: {
                    banner: '/* App -- minimified */'
                },
                files: {
                    'webroot/css/app.min.css': [
                        'webroot/css/theme.css',
                        'webroot/css/fx.css'
                    ]
                }
            },
            vendor:{
                
                options: {
                    banner: '/* Vendor -- minimified */'
                },
                files: {
                    'webroot/css/vendor.min.css': [
                        'webroot/css/vendor/twitter/bootstrap.min.css',
                        'webroot/css/vendor/fontawesome/font-awesome.min.css',
                        'webroot/css/vendor/3xw/fonts-path-fix.css',
                        'webroot/css/vendor/3xw/cake.css',
                        'webroot/css/vendor/3xw/helpers.css'
                    ]
                }
            }
        },
        
        // JS
        uglify: {
            
            prod: {
                options: {
                    banner: '/* App -- prod */',
                    mangle: false
                },
                files: {
                    'webroot/js/app.min.js': [
                    'webroot/js/app.js',
                    ]
                }
            },
            
            app: {
                options: {
                    banner: '/* App -- debug */',
                    beautify: true,
                    mangle: false
                },
                files: {
                    'webroot/js/app.min.js': [
                    'webroot/js/app.js',
                    ]
                }
            },
            
            vendor: {
                options: {
                    banner: '/* Vendor -- minimified */',
                },
                files: {
                    'webroot/js/vendor.min.js': [
                        'webroot/js/vendor/vimeo/froogaloop2.min.js',
                        'webroot/js/vendor/underscorejs/underscore-1.7.0.min.js',
                        'webroot/js/vendor/jquery/jquery-1.10.1.min.js',
                        'webroot/js/vendor/twitter/bootstrap.min.js',
                        'webroot/js/vendor/monospaced/hamster.js',
                        'webroot/js/vendor/angular/angular-1.2.18.js',
                        'webroot/js/vendor/angular/modules/mousewheel.js',
                        'webroot/js/vendor/greensock/TweenMax.min.js'
                    ]
                }
            }
        },
        
        // WATCH AND RUN TASKS
        watch: {
            scripts: {
                files: [
                'webroot/js/*',
                ],
                tasks: ['uglify:app'],
                options: {
                    nospawn: true
                }
            },
            css: {
                files: [
                'webroot/css/*.css',
                ],
                tasks: ['cssmin:app']
            }
        }
    });
    
    // tasks from npm
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // our tasks
    grunt.registerTask('default', 'watch');
    grunt.registerTask('vendor', ['cssmin:vendor', 'uglify:vendor']);
    grunt.registerTask('prod', ['cssmin:vendor', 'uglify:vendor','cssmin:app', 'uglify:prod']);
}
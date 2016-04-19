module.exports = function(grunt) {

    var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        copy: {
            fonts: {
                files: [{
                    cwd: 'app/Resources/assets/fonts/',
                    expand: true,
                    src: '**',
                    dest: 'web/fonts/'
                }]
            },
            reader_bundle: {
                files: [{
                    cwd: 'app/Resources/assets/reader/',
                    expand: true,
                    src: '**',
                    dest: 'web/reader/'
                }]
            },
            medium_fonts: {
                files: [{
                    cwd: 'app/Resources/assets/css/',
                    expand: true,
                    src: 'custom-fonts.css',
                    dest: 'web/css/'
                }]
            }
        },
        imagemin: { // Task
            static: { // Target
                options: { // Target options
                    optimizationLevel: 5,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'app/Resources/assets/img/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'web/img/' // Destination path prefix
                }]
            }
        },
        concat: {
            base_css: {
                src: [
                    'app/Resources/assets/css/app.css',
                    'app/Resources/assets/css/screen.css',
                    'app/Resources/assets/css/ie.css',
                    'app/Resources/assets/css/owl.carousel.css',
                    'app/Resources/assets/css/owl.theme.css',
                    'app/Resources/assets/css/dakota.css'
                ],
                dest: 'app/Resources/assets/concatenated/base-concatenated.css'
            },
            grid_index_css: {
                src: [
                    'app/Resources/assets/css/component-covers.css',
                    'app/Resources/assets/css/animated-covers.css'
                ],
                dest: 'app/Resources/assets/concatenated/animated-covers-concatenated.css'
            },
            base_js: {
                src: [
                    'app/Resources/assets/js/jquery-1.10.2.min.js',
                    'app/Resources/assets/js/jquery-migrate.js',
                    'app/Resources/assets/js/plugins.js',
                    'app/Resources/assets/js/headroom.js',
                    'app/Resources/assets/js/jquery.unveilEffects.js',
                    'app/Resources/assets/js/custom.js',
                    'app/Resources/assets/js/owl.carousel.js',
                    'app/Resources/assets/js/dakota.js'
                ],
                dest: 'app/Resources/assets/concatenated/base-concatenated.js'
            },
            base_head_js: {
                src: [
                    'app/Resources/assets/js/modernizr.js',
                    'app/Resources/assets/js/detection.js'
                ],
                dest: 'app/Resources/assets/concatenated/base-head-concatenated.js'
            },
            grid_index_js: {
                src: [
                    'app/Resources/assets/js/masonry.pkgd.min.js',
                    'app/Resources/assets/js/imagesloaded.pkgd.min.js',
                    'app/Resources/assets/js/classie.js',
                    'app/Resources/assets/js/Vibrant.min.js',
                    'app/Resources/assets/js/gridScrollFx.js',
                    'app/Resources/assets/js/jquery.downCount.js'
                ],
                dest: 'app/Resources/assets/concatenated/grid-index-concatenated.js'
            },
            medium_editor_js: {
                src: [
                    'app/Resources/assets/js/medium-editor.js',
                    'app/Resources/assets/js/medium-editor-mobile-plugin.js',
                    'app/Resources/assets/js/handlebars.runtime.min.js',
                    'app/Resources/assets/js/jquery-sortable-min.js',
                    'app/Resources/assets/js/jquery.ui.widget.js',
                    'app/Resources/assets/js/jquery.iframe-transport.js',
                    'app/Resources/assets/js/jquery.fileupload.js',
                    'app/Resources/assets/js/medium-editor-insert-plugin.min.js'
                ],
                dest: 'app/Resources/assets/concatenated/medium-editor-concatenated.js'
            },
            medium_editor_css: {
                src: [
                    'app/Resources/assets/css/medium-editor.css',
                    'app/Resources/assets/css/medium-editor-insert-plugin.css'
                ],
                dest: 'app/Resources/assets/concatenated/medium-editor-concatenated.css'
            }
        },

        jshint: {
            all: [
                'web/bundles/app/js/rainpress.js',
                'web/bundles/app/js/custom.js'
            ]
        },

        watch: {
            scripts: {
                files: ['src/AppBundle/**/*.*', "app/Resources/assets/**/*.*"],
                tasks: ['default']
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'web/css/base.min.css': ['app/Resources/assets/concatenated/base-concatenated.css'],
                    'web/css/grid-index.min.css': ['app/Resources/assets/concatenated/animated-covers-concatenated.css'],
                    'web/css/medium-editor.min.css': ['app/Resources/assets/concatenated/medium-editor-concatenated.css']
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'web/js/base-head.min.js': ['app/Resources/assets/concatenated/base-head-concatenated.js'],
                    'web/js/base.min.js': ['app/Resources/assets/concatenated/base-concatenated.js'],
                    'web/js/grid-index.min.js': ['app/Resources/assets/concatenated/grid-index-concatenated.js'],
                    'web/js/medium-editor.min.js': ['app/Resources/assets/concatenated/medium-editor-concatenated.js'],
                    'web/js/backend-loader.min.js': ['app/Resources/assets/js/backend-loader.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('js-hint', ['jshint']);
    grunt.registerTask('css-min', ['cssmin']);
    grunt.registerTask('concatenate', ['concat']);
    grunt.registerTask('copy-files', ['copy']);
    grunt.registerTask('min-js', ['uglify']);
    grunt.registerTask('image-min', ['imagemin']);


    // Default task(s).
    grunt.registerTask('default', ['copy-files', 'image-min', 'js-hint', 'concatenate', 'css-min', 'min-js']);
};
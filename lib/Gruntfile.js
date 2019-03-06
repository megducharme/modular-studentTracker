module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      scripts: {
        files: ["../**/scripts/*.js", "!node_modules/**/*.js"],
        tasks: ["eslint", "browserify", "uglify"],
        options: {
          spawn: false
        }
      }
    },
    browserify: {
      dist: {
        files: {
          "build/bundle.js": ["../scripts/main.js"]
        }
      }
    },
    uglify: {
      options: {
        banner:
          "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      build: {
        files: [
          {
            expand: true,
            cwd: "build",
            src: "bundle.js",
            dest: "build",
            ext: ".min.js"
          }
        ]
      }
    },
    eslint: {
      src: ["../**/scripts/*.js", "!node_modules/**/*.js"]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.registerTask("default", ["browserify", "uglify", "watch", "eslint"]);
};

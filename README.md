I’ve found it useful to perform a few tasks when I use “git commit” so I
bundled these together into one workflow. I’m pretty new to Grunt but
this helps me keep everything that I would normally do on commit
automated.

The simple grunt workflow takes a screenshot of your site’s current
state at a few breakpoints, then commits changes to Git with a custom
commit message. It also provides a few useful enhancements and builds a
server with live reloading enabled automatically.

To my mind, this workflow has a bit of an opinion and is for fairly
small, responsive projects. But I’m open to suggestions, and feedback is
encouraged.

### Dependencies

You should make sure that you have [Node](http://nodejs.org/) and
[Grunt](http://gruntjs.com/) installed for the workflow, and
[PhantomJS](http://phantomjs.org/) for the screenshots.

### To Install

Clone or download this directory.

Then just run node install in your command line. Grunt and all of
grunt’s dependencies will automatically be installed locally.

`npm install`

### To Use

There are a couple of grunt tasks that will perform a few different
steps in the automation process. All of the automations will be applied
to the files located in the “src” directory. It’s probably easiest to
just list out each task and what it does. To run any of these tasks,
open the Terminal, navigate to the directory with the gruntfile and run
any of these commands.

`grunt`

The default grunt tasks will do quite a few things. First, it will
optimize all the images in the images directory, perform JSHint on the
projects Javascript files, then concat and compress SASS files into a
single CSS file. Then it will take screenshots of any “.html” file
(index.html for instance) and save that to a timestamped folder in
“screenshots.” Next it will ask you for a Git Commit Message, where you
can type anything. The workflow will run “git add .” and “git commit -am
<your-message>” so that changes are committed to your git repo. It’ll
end by booting up a local server, loading up the page in your browser,
then running the watch task so that when any file is changed in the
“src” directory, they will be livereloaded right in the browser. Whoo,
that’s a lot of stuff I used to do manually.

`grunt styles`

Very simply will compile SASS to a single CSS file.

`grunt git`

Will ask you for a commit message, then automatically run “git add .”
and “git commit -am <your-message>”, committing all new files to the
directory.

`grunt server`

Boot up a server with livereloading enabled, followed by a watch task to
watch for any changes to your directory’s files.

`grunt screen`

Take a screenshot of any .html files in the src directory at different
breakpoints.

### Editing

I’ve tried to add some inline documentation to the Gruntfile, and
everything is pretty basic. The one thing to note is that if you change
the directory of your projects away from **src**, make sure to change
the **local** variable at the top of the Gruntfile to your project’s
relative path.

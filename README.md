# landscape3d
comunity building game






# part 1

steps

- download cursor or any ai code editor
- set up openrouter connection (optional)
- create nextjs project using template or command
- run development server and enable ai agent
- clean up landing page boilerplate
- add title and generate code with comments
- create menu buttons
- move menu to separate component
- add styling using ai pattern recognition
- create route endpoint for player identification

## script 

i just made this multiplatform 3d game
with a collaborative multiplayer mode
in just a few days using the new vibe coding strategy

first download cursor or any ai code editor
you can also add an openrouter connection, to use it complete for free

now, well start with a basic nextjs template, which you can download here
https://github.com/webduno/create-next-app-15.2.4/archive/refs/heads/main.zip
or by running this command  which i always use, 
npx create-next-app@15.2.4 webgame0 --ts --app --src-dir --no-tailwind --eslint --import-alias "@/*"  --turbopack
both the link and command will be in the description

once the download is finished
open the folder in the editor and run the developmnet server
in order to show the ai inside the code editor press ctrl+L
now select agent
great, you can now start prompting for changes 

my style of prompting is small and incremental
instead of one big task of like creating a whole game,
because the ai may get stuck on trying to many things at once without testing

so, as a first task we'll delete all of the boiler plate inside the landing page
with a promp like this one, let the ai agent run for a moment,
lets validate that it did work, and then click accept for each file
or just accept all
<!-- then add a title and you can also generate code with comments -->
another way of generating code is with comments on the actual file
so lets make a couple of buttons
and finally tell the ai to move all this to a new component

ok, for styling
we can generate a lot of classes by adding just one,
and letting the ai underestand the pattern
like in this example
or telling it directly to add styles to a page
like we did here

now that we have a menu screen ready, well start with some logic
since we'll identify players by their ip at first,
lets generate an route endpoint file for it









# part 2

steps

- add google login button and endpoint
- create simple single and multiplayer pages
- add basic 3d scene
- make the component general so its usable for all
- create specific scene for single page
- if running commands for reorg, you may need to confirm each command
- make scene editable to add new objects
- camera controls
- reorg
- add controls to the new added object, for transforms
- save objects to browser storage

## script

we'll also use google login for this, 
first set up a google auth project and get your credentials
if you dont know how to do it, let me know in the comments
make the agent generate the login button in our main menu
and create the endpoint to handle the nextjs-google auth backend logic

next, lets create the actual single and multiplayer pages
so, prmopt the ai to create
a basic 3d scene using a framework called react three fiber or just "r3f" for short
since this will be our foundation for both modes
make the ai create a reusable scene component
to make our code more maintainable
this way we can have different scenes for single and multiplayer
while sharing the same 3d scene functionality


now comes the fun part - making the scene editable
the core of this game, is to build your own game
so, first in the single player mode,
tell the ai to make the scene handle adding new objects
and make them editable, meaning add controls to change size, scale and rotation
to transform the new objects in real-time

now we create a simple camera
that will let players move around and explore from a godseye view

and finally tell the agent
that all changes will be saved to the browser's local storage
so they can continue building their world later

remember to test each feature as you go
this way we can make sure previous tasks still works smoothly
and fix any small issues the ai couldnt catch before moving on
or if something doesn't work at all, we can always go back
and tell the ai to try a different approach
with this button, "restore checkpoint"
click continue and you can go back to the state of the code before asking a question
to rephrase the prompt and send again
but its always reocmmended to also use the git protocol for versioning








# part 3


#script
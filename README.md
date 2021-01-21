<p align="center">
  <img src="https://user-images.githubusercontent.com/58031924/104849349-7f390680-58e9-11eb-888c-50d7f7ac0c32.png"/>
</p>

Have you have ever been in the situation where you would really like to make up a beat or a rhythmic pattern for your song but you didn't have the time or the knowledge to do it using your favourite DAW?
Well, now we have the solution for you!

__Dean 25__ is a simple drum machine that exploits euclidean patterns in order to produce beats.
A web app that allows you to go from catchy, relaxing, exotic feelings to even moody, dark and emotional ones in a few easy steps,  going from creating simple kick and snare beats to even discovering the complex and fashinating nature of polirithms.
It is the place that fulfill the needs of the more advanced producers as well as beginners to get inspiration for their new upcoming songs.

## What is the idea behind?
As said before, Dean25 base its principles on the euclidean patterns. 
But, what are they?
To understand them, we need to define two important paramters:
* __Steps__ (or __Tatum__), that corresponds to the shortest durational values in music that are still more than incidentally encountered
* __Pulses__ (or __Tactus__), that corresponds to the OnSets of the instrument (i.e. the foot tapping rate)

So, Euclidean patterns are a class of musical rhythms where the OnSets (pulses) are spread out among the steps as evenly as possible.

## How to use?
In order to create a beat from scratch, just follow this simple steps:
1. In the main page, click the <img src="https://user-images.githubusercontent.com/58031924/104848569-e1900800-58e5-11eb-881b-2438c40dcd30.PNG" width="5%" height="5%" /> icon on the top left corner to add an instrument line
2. Click on the <img src="https://user-images.githubusercontent.com/58031924/104848633-477c8f80-58e6-11eb-93db-3933158a3d50.PNG" width="4%" height="4%" /> button and selecting the sample that you want 
3.  Tune the values of Steps, Pulses and Offset as you like
  <img src="https://user-images.githubusercontent.com/58031924/104848707-89a5d100-58e6-11eb-96af-ccc001c16567.PNG"/>

4. Repeat steps from 1 to 3 until you've added all the instruments that you need
5. Just click <img src="https://user-images.githubusercontent.com/58031924/104848938-6deefa80-58e7-11eb-9064-e46a124724fa.PNG" width="2%" height="2%" /> in the top bar and enjoy your creation!

If you want to delete an instrument line, you have to:
1. Click the <img src="https://user-images.githubusercontent.com/58031924/104848841-dbe6f200-58e6-11eb-9f68-249f01e1878b.PNG" width="2%" height="2%" /> button on the top left of the page
2. Choose the one or more lines to delete by clicking on the <img src="https://user-images.githubusercontent.com/58031924/104848841-dbe6f200-58e6-11eb-9f68-249f01e1878b.PNG" width="2%" height="2%" /> buttons that will apper at the right of each element added to the session

To download your creation, after you finished working on the beat, you will:
1. Press on <img src="https://user-images.githubusercontent.com/58031924/104848885-1f416080-58e7-11eb-958d-eb5241d7d8f2.PNG" width="2%" height="2%" /> in the top bar
2. Wait for the process to finish (a countdown will appear)
3. Rename the file to download and click on the "Download" underneath it and the job is completed!  

<img src="https://user-images.githubusercontent.com/58031924/104848130-d89e3700-58e3-11eb-89bb-a06f3569bd00.gif" width="480" height="300" />

## Features

### Drum machine
All the standard drum machine features will be available: bpm control, master volume as well as solo, mute, pan and volume controls for each of the instrument lines.
### Free Mode
All the patterns that can be generated follow the euclidean algorithm.
If this isn't enough for you, by activating the free mode in the menu located the top right of the page, you will be able to modify the patterns as you would do in a normal drum machine, escaping from the "euclidean rules" in order to merge the classical and original waves togheter for the creation of original hybrid beats.

<img src="https://user-images.githubusercontent.com/58031924/104847883-a2ac8300-58e2-11eb-8091-5abe8a462a3d.gif" width="480" height="300" />

### Download
When done with your producing, you will be able to download the entire beat in ".wav" format by simply clicking the red circle in the transport bar and waiting for the recording process to finish.
With this you will be able to transfer your creation to your favourite DAW to add some cool effects to it or even to add a melody completing your production.

## Coming soon

### Save session
In the upcoming future, we would like to add a save session feature for keeping all your progress and changes saved into a session in order for you to go back to it whenever you want to complete your work.
### Export MIDI
Aside from the ".wav" download function, we would like to add also the possibility to export the MIDI version of your work to provide a more rapid download (especially for long sessions) and allowing the possibility of importing the session in DAWs either to change the samples if not liked or even for applying little adjustments in the patterns created.

## Libraries and resources

For Dean25 development, the external libraries we used are:
* __[Vue.js](https://vuejs.org/)__, the framework where our app is built on
* __[Firebase](https://firebase.google.com/)__, the database for uploading and retrieving the audio samples
* __[Recorder.js](https://github.com/mattdiamond/Recorderjs)__, a plugin for recording/exporting the output of Web Audio API nodes

Drum samples taken from:
* __[BPB Cassette 909](https://bedroomproducersblog.com/2014/04/24/free-909-samples/)__, Roland TR909 sample pack
* __[UNIT: 808](https://loopcult.com/products/unit-808-bass-sample-pack)__, Roland TR808 sample pack
* __[LinnDrum Tape](https://www.synthtopia.com/content/2016/09/21/free-linndrum-tape-drum-sample-library/)__, LinnDrum sample pack
* __[Slingerland Drum Kit](https://www.indiedrums.com/2015/10/10/slingerland-kit/)__, Slingerland acoustic drum-kit sample pack

## Links

Here you can find the links for:
* the __web app__ ([here](https://dean25.surge.sh))
* a quick video __demo__ of our project ([here](https://youtu.be/jXeHQTZSNw0))


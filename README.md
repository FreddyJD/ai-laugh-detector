### An Improved YouTube video AI laugh detector

This AI was built originally by Kimiko Ryokai, Elena Durán López, Noura Howell, Jon Gillick, and David Bamman (2018), "Capturing, Representing, and Interacting with Laughter," CHI 2018. 
#python segment_laughter.py input/L88Jns5gQGk.wav models/model.h5 output 0.8 0.1
Few improvements on this project:


- Added a Docker so anyone can use it. (Just trying to get it working took me a solid a week.)
- A NodeJS Wrapper that creates a simple api that will download a YouTube video and covert it to a wavfile.
- Simple frontend where you can lazy load the YouTube video.


Not ment for production use. This is just a few improvement on a great project.
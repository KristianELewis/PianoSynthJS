#!/bin/bash

npm run build
rm ../staticFiles/PianoSynthJS/ -r
mv dist/ ../staticFiles/PianoSynthJS

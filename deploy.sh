#!/bin/bash

npm i

npm run build

NODE_ENV=production node bin/index.js

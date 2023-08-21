#!/bin/bash
# a

find . -depth -name "*.abc" -exec sed -i 's|index.html|../Web|g' about.html
find . -depth -name "*.abc" -exec sed -i 's|\.html| |g' about.html
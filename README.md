image-to-heightmap [![npm version](https://badge.fury.io/js/image-to-heightmap.svg)](http://badge.fury.io/js/image-to-heightmap) [![Build Status](https://travis-ci.org/chinedufn/image-to-heightmap.svg?branch=master)](https://travis-ci.org/chinedufn/image-to-heightmap)
==================

> Convert a JPG or PNG image into a tile-based height-map array

## Initial Motivation

To use when creating terrains in WebGL

ex:

1. Make a hilly terrain in a 3d modeling tool
2. Save as height-map image
3. Use `images-to-heightmap` on image
4. Generate a grid of `GL_TRIANGLES` (`tiles`) using the heights from the height map

## To Install

```
$ npm install --save image-to-heightmap
```

## Usage

```js
var toHM = require('image-to-heightmap')

// This will generate an 11 x 6 heightmap array from our image
// Why 11 x 6 ?
//
// 10 x 5 tiles means we have 11 x 6 different corners
toHM('some-image.png', 10, 5, 2, function (err, heightmap) {
    console.log(heightmap[0][0])
    // The height of the point at the bottom left corner
})
```

## What are tiles ?

Picture a terrain that's made up of a bunch of equally sized rectangles

Each rectangle has 4 corners. Each of these corners has a height

Rectangles will share some corners with adjacent rectangles

1 tile wide x 1 tile high = 2 corners wide x 2 corners height

2 tile wide x 3 tile high = 3 corners wide x 4 corners height

etc ...

#### TODO:

Maybe call this a `grid` instead of `tiles`?

## API

### `toHM(imageURL, numXTiles, numYTiles, scale, callback)` -> `vtree`

#### imageURL

*Required*

Type: `string`

`imageURL` is the path to the file. It can be a relative path, an http url, a data url, or an in-memory Buffer

This gets passed into [scijs/get-pixels](https://github.com/scijs/get-pixels#install)

#### numXTiles

*Required*

Type: `number`

The number of `tiles` wide that your terrain will be

##### numYTiles

Type: `number`

The number of `tiles` deep that your terrain will be

##### scale

Type: `number`

`image-to-heightmap` generates heights with `0 <= height <= scale`

A black pixel will have a height of `0`

A white pixel will have a height of `scale`

A pixel with `rgba` of `50, 50, 50, 255` would have a height of (50 / 255 * scale)

##### callback

Type: `function`

Called with an `error` and your 2-dimensional heightmap array
```
function cb (err, heightmap) {
  console.log(heightmap[1,1])
  // The height at the top right corner of the bottom left tile
}
```

## TODO:

- Talk about what types of images to use
- Add defaults? Maybe a default `scale` of 1?
- Test edge cases. ex: what happens when trying to make a `0 x 0` grid?

## License

MIT

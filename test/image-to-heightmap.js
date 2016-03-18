var toHM = require('../')
var test = require('tape')

var path = require('path')

var heightmapJPG = path.resolve(__dirname, './fixture/heightmap16x16.jpg')

var expectedHeightmap = [
  [0, 0, 0],
  [1, 1, 1],
  [1, 1, 1]
]
var expectedScaledHeightmap = [
  [0, 0, 0],
  [5, 5, 5],
  [5, 5, 5]
]

test('Generate heightmap', function (t) {
  t.plan(2)
  toHM(heightmapJPG, 2, 2, 1, function (_, actualHeightmap) {
    t.deepEqual(actualHeightmap, expectedHeightmap, 'Unscaled heightmap')
  })
  toHM(heightmapJPG, 2, 2, 5, function (_, actualScaledHeightmap) {
    t.deepEqual(actualScaledHeightmap, expectedScaledHeightmap, 'Scaled heightmap')
  })
})

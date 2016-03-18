var getPixels = require('get-pixels')

module.exports = ImageToHeightmap

function ImageToHeightmap (imageURL, numXTiles, numYTiles, scale, cb) {
  getPixels(imageURL, function (err, pixels) {
    if (err) return cb(err)

    var tileHeights = []
    var imageWidth = pixels.shape[0]
    var imageHeight = pixels.shape[1]

    // Loop through all of our tile corners, and generate a height for each corner
    for (var x = 0; x < numXTiles + 1; x++) {
      tileHeights[x] = []
      for (var y = 0; y < numYTiles + 1; y++) {
        // Get the corresponding pixel for the current tile corner
        var pixelXPos = Math.ceil(x * (imageWidth - 1) / numXTiles)
        var pixelYPos = Math.ceil(y * (imageHeight - 1) / numYTiles)

        // Get the colors for the given pixel
        var red = pixels.get(pixelXPos, pixelYPos, 0)
        var green = pixels.get(pixelXPos, pixelYPos, 1)
        var blue = pixels.get(pixelXPos, pixelYPos, 2)
        // TODO: Should we calculate alpha for each pixel if we're expecting
        // the same value every time? Should we even expect the same value every time?
        var alpha = pixels.get(pixelXPos, pixelYPos, 3)

        // Note that we divide by `alpha` to get the height
        // If we always use fully opaque images, alpha will be the maximum possible value
        // This allows us to handle 8bit, 16bit, or Nbit images
        // Values are based on ratios. We don't care about the images bit depth
        var heightAtThisPosition = scale * (red + green + blue) / 3 / alpha
        tileHeights[x].push(heightAtThisPosition)
      }
    }
    return cb(null, tileHeights)
  })
}

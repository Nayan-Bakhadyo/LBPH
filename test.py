
# Importing Image class from PIL module
from PIL import Image
 
# Opens a image in RGB mode
im = Image.open("1.jpg")
 
# Size of the image in pixels (size of original image)
# (This is not mandatory)
width, height = im.size
 
# Setting the points for cropped image
left = 6
top = height / 4
right = 174
bottom = 3 * height / 4
# Cropped image of above dimension
# (It will not change original image)
im1 = im.crop((left, top, right, bottom))
newsize = (640, 480)
im1 = im1.resize(newsize)
# Shows the image in image viewer
im1.show()
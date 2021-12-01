import os
parent_dir = "/Users/nayand/Desktop/Major project/Face Recognition/"
id = 1234
directory = str(id)
path = os.path.join(parent_dir, directory)
os.mkdir(path)
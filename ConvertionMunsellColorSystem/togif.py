import os
import imageio

# 画像を入れる箱を準備
images = []

# 画像を箱に入れていく
directory_path = 'out'
for image_name in sorted( os.listdir(directory_path), key=lambda x: int(x.split('.')[0])):
    image_path = os.path.join(directory_path, image_name)
    images.append(imageio.imread(image_path))
    # print(image_name)
# print(images)
# MP4アニメを出力する
output_path_mp4 = 'animation.mp4'
imageio.mimsave(output_path_mp4, images, fps=30)  # 1秒あたり10フレームの場合

print(f'MP4 created successfully: {output_path_mp4}')

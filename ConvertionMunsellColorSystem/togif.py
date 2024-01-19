import os
import imageio
from tqdm import tqdm

# 画像を入れる箱を準備
images = []

# 画像を箱に入れていく
directory_path = 'frameout'
image_files = sorted(os.listdir(directory_path), key=lambda x: int(x.split('.')[0]))

for image_name in tqdm(image_files, desc="Reading Images"):
    image_path = os.path.join(directory_path, image_name)
    images.append(imageio.imread(image_path))

# MP4アニメを出力する
output_path_mp4 = 'animation.mp4'
imageio.mimsave(output_path_mp4, images, fps=30)  # 1秒あたり30フレームの場合

print(f'MP4 created successfully: {output_path_mp4}')

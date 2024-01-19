import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import BatchNormalization




colorcodeHVC = pd.read_csv('colorcodeToHVC.txt', delimiter='\s+', names=['rgb', 'H', 'V', 'C'])
r,g,b=[],[],[]
H,V,C=[],[],[]
color=[]
x,y,z=[],[],[]
# for index, data in colorcodeHVC.iterrows():
#     r.append( int(data['rgb'][1:3], 16))
#     g.append(int(data['rgb'][3:5], 16))
#     b.append( int(data['rgb'][5:7], 16))
#     H.append(  float(data['H']))
#     V.append(  float(data['V']))
#     C.append(  float(data['C']))
#     color.append((r[-1]/255.0, g[-1]/255.0, b[-1]/255.0))
#     rad=H[-1]/40.0*2*math.pi
#     # print(rad)
#     x.append(math.sin(rad)*C[-1])
#     y.append(math.cos(rad)*C[-1])
#     z.append(V[-1]*5)

r,g,b=[],[],[]
color=[]
for rv in range(0,255,25):
    for gv in range(0,255,25):
        for bv in range(0,255,25):
            r.append(rv)
            g.append(gv)
            b.append(bv)
            color.append([rv/255.0,gv/255.0,bv/255.0])



fig, ( rgb,hvc,result) = plt.subplots(1, 3, subplot_kw={'projection': '3d'})



s=2

# print(predictions)

rgb.scatter(r,g,b,color=color,s=s)
rgb.set_zlabel('V')
rgb.axis('equal')
rgb.set_title('input')

model = load_model('RGBtoHVC.h5')
predictions = model.predict(np.column_stack((r, g, b)))

x=predictions[:,0]
y=predictions[:,1]
z=predictions[:,2]
# print(x)

hvc.scatter(x,y,z,color=color,s=s)
hvc.set_xlim([-20, 20])
hvc.set_ylim([-20, 20])
hvc.set_zlim([0, 10])
hvc.set_title('HVC')

HVCtoRGB = load_model('HVCtoRGB.h5')
predictions = HVCtoRGB.predict(np.column_stack(( np.array(x), np.array(y), np.array(z))))
print(predictions)

result.scatter(predictions[:,0],predictions[:,1],predictions[:,2],color=color,s=s)
result.axis('equal')
result.set_title('RGBresult')
result.set_xlim([0, 255])
result.set_ylim([0, 255])
result.set_zlim([0, 255])

for i in range(0,360):
    for f in [rgb,hvc,result]:
        f.view_init(elev=20, azim=i) 
    # plt.title(f"{epoch}")
    plt.savefig(f'frameout/{i}.png',dpi=300)




plt.show()
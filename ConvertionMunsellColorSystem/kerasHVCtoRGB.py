import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import BatchNormalization


# print(colorcodeHVC)

# fig = plt.figure()
fig, (( hvcax,rgbax),(resultrgb,result)) = plt.subplots(2, 2, subplot_kw={'projection': '3d'})


colorcodeHVC = pd.read_csv('colorcodeToHVC.txt', delimiter='\s+', names=['rgb', 'H', 'V', 'C'])
r,g,b=[],[],[]
H,V,C=[],[],[]
color=[]
x,y,z=[],[],[]
for index, data in colorcodeHVC.iterrows():
    r.append( int(data['rgb'][1:3], 16)/255.0)
    g.append(int(data['rgb'][3:5], 16)/255.0)
    b.append( int(data['rgb'][5:7], 16)/255.0)
    H.append(  float(data['H']))
    V.append(  float(data['V']))
    C.append(  float(data['C']))
    color.append((r[-1], g[-1], b[-1]))
    rad=H[-1]/40.0*2*math.pi
    # print(rad)
    x.append(math.sin(rad)*C[-1])
    y.append(math.cos(rad)*C[-1])
    z.append(V[-1])


s=2
rgbax.scatter(r, g, b,color=color,s=s)
rgbax.set_title('RGB')
rgbax.set_xlabel('R')
rgbax.set_ylabel('G')
rgbax.set_zlabel('B')

rgbax.set_xlim([0, 1])
rgbax.set_ylim([0, 1])
rgbax.set_zlim([0, 1])


hvcax.scatter(x,y, z,color=color,s=s)
hvcax.set_zlabel('V')
hvcax.axis('equal')
hvcax.set_title('MunsellColorSystem')
hvcax.set_xlim([-20, 20])
hvcax.set_ylim([-20, 20])
hvcax.set_zlim([0, 10])
# hvcxyzax.scatter(H, V, C,color=color,s=s)
# hvcxyzax.set_title('HVC')
# hvcxyzax.set_xlabel('H')
# hvcxyzax.set_ylabel('V')
# hvcxyzax.set_zlabel('C')



def training():
    model = Sequential()
    model.add(Dense(8, input_dim=3, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dense(8, activation='relu'))
    model.add(Dense(8, activation='relu'))
    model.add(Dense(3))  
    model.add(BatchNormalization())
    model.compile(optimizer='adam', loss='mse')  
    model.fit(np.column_stack((x, y, z)), np.column_stack((r,g,b)), epochs=1000)
    # model.save_weights('RGBtoHVC.h5')
    model.save('HVCtoRGB.h5')
    print(model.to_json())

# training()

model = load_model('HVCtoRGB.h5')
predictions = model.predict(np.column_stack((x, y, z)))
print(predictions)

result.scatter(predictions[:,0],predictions[:,1],predictions[:,2],color=color,s=s)
result.axis('equal')
result.set_title('TrainingResult')

result.set_xlim([0, 1])
result.set_ylim([0, 1])
result.set_zlim([0, 1])
# H,V,C=[],[],[]
# color=[]
# for rv in range(0,255,25):
#     for gv in range(0,255,25):
#         for bv in range(0,255,25):
#             r.append(rv)
#             g.append(gv)
#             b.append(bv)
#             color.append([rv/255.0,gv/255.0,bv/255.0])


# predictions = model.predict(np.column_stack((H, V, C)))
# print(predictions)

# resultrgb.scatter(predictions[:,0],predictions[:,1],predictions[:,2],color=color,s=s)
# resultrgb.set_zlabel('V')
# resultrgb.axis('equal')
# resultrgb.set_title('TrainingResult')





plt.show()



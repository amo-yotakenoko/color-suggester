import pandas as pd
import numpy as np
from tqdm import tqdm




real_sRGB = pd.read_csv('real_sRGB.csv')[['dR', 'dG', 'dB', 'x', 'y', 'Y']]
# print(pd.read_csv('all.dat'))
HVCxyY = pd.read_csv('all.dat', delimiter='\s+')[['H', 'V', 'C', 'x', 'y', 'Y']]


H_values = HVCxyY['H'].unique()
print(H_values)
# exit()


with open('colorcodeToHVC.txt', 'w',buffering=1) as output_file:
    for index, row in tqdm(real_sRGB.iterrows(), total=len(real_sRGB) ):
        R,G,B = int(row['dR']), int(row['dG']), int(row['dB'])
        colorcode = f"#{format(R, '02X')}{format(G, '02X')}{format(B, '02X')}"
        x,y,Y = float(row['x']), float(row['y']), float(row['Y'])
        H,V,C=0,0,0
        min_distance=float('inf')
        for index, HVCxyYrow in HVCxyY.iterrows():
            x2, y2, Y2 = float(HVCxyYrow['x']), float(HVCxyYrow['y']), float(HVCxyYrow['Y'])
            distance = np.sqrt((x - x2)**2 + (y - y2)**2 + (Y - Y2)**2)
            if distance < min_distance:
                min_distance = distance
                H=np.where(H_values == HVCxyYrow['H'])[0][0]
                V,C=float(HVCxyYrow['V']),float(HVCxyYrow['C'])
        output_file.write(f"{colorcode}\t{H}\t{V}\t{C}\n")
       



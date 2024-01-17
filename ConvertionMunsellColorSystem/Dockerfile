FROM ubuntu:latest


RUN apt-get update
RUN apt-get install -y python3 python3-pip 
RUN pip install --upgrade jax==0.4.23 jaxlib==0.4.23
RUN pip install tensorflowjs

WORKDIR /app
COPY  RGBtoHVC.h5 .
RUN ls&&sleep 1
# RUN sleep 100
RUN tensorflowjs_converter --input_format=tf_saved_model ./RGBtoHVC.h5 /app/tfjs_model

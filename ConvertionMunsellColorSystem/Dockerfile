FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y python3 python3-pip 
RUN pip install tensorflow tensorflowjs

WORKDIR /app
COPY RGBtoHVC.h5 .
RUN ls && sleep 6
RUN cat RGBtoHVC.h5 && sleep 6
RUN mkdir /app/tfjs_model
RUN tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model RGBtoHVC.h5 /app/tfjs_model
RUN ls && sleep 5
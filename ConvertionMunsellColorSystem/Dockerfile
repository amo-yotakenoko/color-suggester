# FROM ubuntu:latest

# RUN apt-get update
# RUN apt-get install -y python3 python3-pip 
# RUN pip install tensorflow tensorflowjs

# WORKDIR /out
# COPY RGBtoHVC.h5 .
# RUN ls && sleep 6
# RUN cat RGBtoHVC.h5 && sleep 6
# RUN mkdir /out/tfjs_model
# RUN tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model /out/RGBtoHVC.h5 /out/tfjs_model
# RUN ls && sleep 5


FROM tensorflow/tensorflow

# Set the working directory
WORKDIR /out

# Copy the model file (RGBtoHVC.h5) into the container at /out
COPY RGBtoHVC.h5 /out/RGBtoHVC.h5

# Install any dependencies needed for your specific case
# (e.g., if additional Python packages are required)

# Run the tensorflowjs_converter command to convert the model
RUN apt-get update
RUN apt-get install -y python3 python3-pip 
RUN pip install tensorflowjs
RUN tensorflowjs_converter \
    --input_format=keras \
    --output_format=tfjs_layers_model \
    /out/RGBtoHVC.h5 \
    /out/tfjs_model
RUN rm RGBtoHVC.h5

# Optionally, you can expose a port or specify other configurations

# Command to run when the container starts
RUN ls&&sleep 10
CMD ["/bin/bash"]
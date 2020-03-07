FROM tensorflow/tensorflow:1.4.1

# Getting the entire the directory 
ENV HOME ${HOME:-"/root"}
COPY . $HOME/src

RUN pip install -r $HOME/src/requirements.txt && \
    apt-get update && \
    apt-get -y install curl gnupg libsndfile1 && \
    curl -sL https://deb.nodesource.com/setup_11.x  | bash - && \
    apt-get -y install nodejs && \
    pip install keras==2.2.0

EXPOSE 3001
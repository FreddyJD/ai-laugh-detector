FROM tensorflow/tensorflow:1.4.1

ENV HOME ${HOME:-"/usr"}
COPY . $HOME/src

RUN apt-get update && \
    apt-get -y install curl gnupg libsndfile1 && \
    curl -sL https://deb.nodesource.com/setup_11.x  | bash - && \
    apt-get -y install nodejs && \
    pip install librosa==0.5.0 keras==2.0.0 tgt

WORKDIR $HOME/src

EXPOSE 3000
CMD ["node"]
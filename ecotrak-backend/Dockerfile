FROM python:3.10.10-slim
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
ENV LISTEN_PORT=5000
EXPOSE 9888
CMD flask run --host 0.0.0.0
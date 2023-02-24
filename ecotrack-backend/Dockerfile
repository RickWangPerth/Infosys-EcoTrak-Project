FROM python:3.11.1
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
ENV LISTEN_PORT=5000
EXPOSE 5000
CMD flask run --host 0.0.0.0
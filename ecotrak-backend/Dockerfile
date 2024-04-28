FROM python:3.10.10-slim
WORKDIR /app

# Install postgresql-client
RUN apt-get update && apt-get install -y postgresql-client

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 5001 available to the world outside this container
ENV LISTEN_PORT=5001
EXPOSE 5001

# Copy the wait-for-postgres.sh script into our container
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Define environment variable
ENV POSTGRES_PASSWORD=postgres

# Run the command on container startup
CMD ["/wait-for-postgres.sh", "postgresdb", "flask", "run", "--host", "0.0.0.0", "--port", "5001"]

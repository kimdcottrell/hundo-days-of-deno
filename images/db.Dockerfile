# syntax=docker/dockerfile:1
FROM debian:stable-slim

# Install SQLite
RUN apt-get update && apt-get --no-install-recommends install -y sqlite3

# Create a directory to store the database
WORKDIR /data

# Expose the port if needed
EXPOSE 1433

# Command to run when the container starts
CMD ["sqlite3"]

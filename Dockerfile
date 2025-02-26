# Use a base image
FROM ubuntu:20.04

# Install dependencies (adjust as needed for your executable)
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy your executable file into the container
COPY jiotv_go server.key server.crt /app/

# Set the executable permission
RUN chmod +x /app/jiotv_go

# Expose the port that the executable will use
EXPOSE 8080

# Run the executable when the container starts
CMD ["./jiotv_go", "run", "--public", "--https", "--cert", "server.crt", "--cert-key", "server.key"]
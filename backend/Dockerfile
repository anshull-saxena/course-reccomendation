FROM node:18-bullseye

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# Install Python deps first (cached layer)
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install Node deps (cached layer)
COPY package*.json .
RUN npm install

# Copy rest of app
COPY . .

# Start your server
CMD ["node", "server.js"]

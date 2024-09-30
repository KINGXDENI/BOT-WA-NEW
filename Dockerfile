# Gunakan base image dari Node.js versi 18
FROM node:18

# Update paket dan upgrade
RUN apt-get update -y

# Instal neofetch, coreutils, dan ffmpeg
RUN apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
   apt-get upgrade -y

# Membuat direktori kerja di dalam kontainer
WORKDIR /app

# Menyalin package.json terlebih dahulu (untuk cache jika package.json tidak berubah, Docker akan menggunakan layer cache)
COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm",  "start"]

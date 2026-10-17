# 1. Usamos una imagen liviana de Node.js basada en Alpine Linux
FROM node:20-alpine

# 2. Creamos y nos paramos en la carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de dependencias primero (mejora la velocidad de compilación)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos todo el resto del código del frontend
COPY . .

# 6. Exponemos el puerto de desarrollo (Vite usa el 5173 por defecto)
EXPOSE 5173

# 7. Comando para arrancar el servidor de desarrollo
CMD ["npm", "run", "dev"]
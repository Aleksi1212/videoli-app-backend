FROM --platform=amd64 node:18-bullseye

WORKDIR /service

COPY package.json package-lock.json ./

COPY prisma ./prisma/

RUN npm install

COPY . ./

RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "start" ]
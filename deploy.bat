@echo off
echo Deploying RavenRDP...

cd C:\websites\zen-rdp

echo Pulling latest changes...
git pull origin main

echo Installing dependencies...
npm install --legacy-peer-deps

echo Building application...
npm run build

echo Restarting PM2...
pm2 restart ravenrdp

echo Deployment complete!
pause

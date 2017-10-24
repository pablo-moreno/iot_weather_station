cd webapp
npm run build
rm -r ../nodeapp/public/*
cp -r build/* ../nodeapp/public/
cd ..
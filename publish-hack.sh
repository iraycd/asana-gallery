cd dist
git init
git add .
git commit -m 'pages'
git remote add pages github.com:markshlick/markshlick.github.io.git
git push -f pages master

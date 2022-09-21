# Banyumala Waterfall Web App

## Initialization

1. clone / download folder repository ini
2. install node dan npm. info lebih lanjut: https://blogs.masterweb.com/cara-install-npm-di-windows/
3. install xampp. buka, lalu start apache dan mysql.
4. Konfigurasi database dengan buka php my admin dan buat database 'banyumala2'.
5. buka folder repository yang sudah didownload dengan vscode. lalu buka terminal vscode atau tekan <kbd>Ctrl</kbd> + <kbd>`</kbd>
6. pastikan npm dan node telah terinstall.
```bash
node -v
npm -v
```
7. install node module yang dibutuhkan dengan mengetikan perintah pada terminal
```bash
npm install
```
8. buat file dengan nama ".env" dan isi dengan:
```
PORT="3000"

DATABASE_NAME="banyumala2"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_PORT=""
DATABASE_DIALECT="mysql"

API_KEY=key_goes_here
API_URL=url_goes_here
```
9. install nodemon
```bash
npm install -g nodemon
```
10. Jalankan server
```bash
nodemon
```

11. jika tidak ada error buka localhost:3000/admin pada browser. akan diarahkan menuju web admin.
apabila sukses, server dapat dijalankan kembali dengan memasukan perintah nodemon pada terminal. tidak perlu melakukan Initialization lagi

## Usage
Install [Node.js](https://nodejs.org/en/download/) to use the package manager [npm](https://docs.npmjs.com/getting-started) for this repository. If already, open the folder with command prompt or can use terminal on [vscode](https://code.visualstudio.com/). Make sure it is in the repository folder.
```bash
cd repository_folder

npm install
```
Once installed, initialize the env file by changing it to .env and change the port and customize it with mysql authentication such as port, password and make sure to create a database first.
## Contributing
After making a feature, you can do as follows:
```bash
git remote add origin [url]
git remote -v

git checkout -b [name_branch]

git add .

git commit -m "your_message"

git pull origin [main or dev]

git fetch

# If there is a problem it must be fixed first and if not can push to branch

git push origin [name_branch]

```




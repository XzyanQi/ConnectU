# ConnectU

Terdapat perbedaan versi antara angular yang menyebabkan conflict, sebaiknya gunakan versi angular dibawah 19 (jangan 19)

-------

kode program>tsconfig json, bagian strict ubah menjadi false

-----
Membuat page

ionic g page pages/home
ionic g page pages/home/chat

ionic g component components/user-list
ionic g component components/empty-screen
ionic g component components/chat-box

ionic g module components

ionic g page pages/login
ionic g page pages/login/signup
ionic g guard guards/auth/auth (canactive)

ionic g service services/api/api
ionic g service services/auth/auth
ionic g service services/chat/chat

-------

integrasi dengan firebase firestor

membuat akun firebase
all product pilih:
1. Authentication > Email
2. Cloud Firestore dan rules yang false ubah menjadi true
   
buka comand promt, cd (nama file)
npm i -g firebase-tools
firebase init (pilih firestore)
ng add @angular/fire (pilih authen dan fire)  //di angular 19 menyebabkan conflict, jadi gunakan versi di bawah 19

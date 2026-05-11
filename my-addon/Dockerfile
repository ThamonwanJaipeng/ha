FROM nginx:alpine

# ก๊อปปี้ไฟล์โปรเจกต์
COPY app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# ไม่ต้องติดตั้งอะไรเพิ่มเพราะ alpine-nginx มี mime.types มาให้แล้วใน /etc/nginx/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
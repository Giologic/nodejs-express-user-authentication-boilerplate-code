http {
  # NGINX will handle gzip compression of responses from the app server
  gzip on;
  gzip_proxied any;
  gzip_types text/plain application/json;
  gzip_min_length 1000;
 
  server {
    listen 80;
    server_name localhost;
    root /var/www/html;
    index server.js;
 
  } 

  location ~ [^/]\.js(/|$) {
    fastcgi_split_path_info ^(.+?\.js)(/.*)$;
    if (!-f $document_root$fastcgi_script_name) {
      return 404;
    }

    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param PATH_INFO $fastcgi_path_info;
    fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;

    fastcgi_pass node-app:5000;
    fastcgi_index server.js;
  }
}
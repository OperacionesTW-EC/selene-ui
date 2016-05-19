echo 'Borrando versiones anteriores'
rm -rf /var/www/html/selene
ls -al /var/www/html
echo 'Descomprimiendo'
tar  -xvf /var/www/html/selene_ui.tar -C /var/www/html/
ls -al /var/www/html
echo 'Desplegando'
mv /var/www/html/dist /var/www/html/selene
ls -al /var/www/html
echo 'Borrando archivo tar'
rm -rf /var/www/html/selene_ui.tar
ls -al /var/www/html
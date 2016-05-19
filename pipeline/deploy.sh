echo 'Borrando versiones anteriores'
rm -rf /var/www/html/selene
echo 'Descomprimiendo'
tar  -xvf /var/www/html/selene_ui.tar
echo 'Desplegando'
mv /var/www/html/dist /var/www/html/selene

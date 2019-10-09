aws ec2 create-key-pair --key-name boilerplate-keypair --query 'KeyMaterial' --output text > BoilerplateKeyPair.pem
echo "Keypair Created"
chmod 400 BoilerplateKeyPair.pem
echo "Keypair given permissions"
openssl rsa -in BoilerplateKeyPair.pem -pubout -outform DER | openssl md5 -c output
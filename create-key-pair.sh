aws ec2 create-key-pair --key-name boilerplate-keypair-2 --query 'KeyMaterial' --output text > BoilerplateKeyPair2.pem
echo "Keypair Created"
chmod 400 BoilerplateKeyPair2.pem
echo "Keypair given permissions"
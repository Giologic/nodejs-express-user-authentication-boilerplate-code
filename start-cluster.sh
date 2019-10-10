
id_rsa=`cat ~/.ssh/id_rsa`
ecs-cli up --keypair boilerplate-keypair-2 --capability-iam --size 2 --instance-type t2.medium --cluster-config ecs-boilerplate --ecs-profile gio-iot
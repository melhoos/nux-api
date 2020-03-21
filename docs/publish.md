Build `$docker build -t itetechmadacr.azurecr.io/nux-api .`
Run `$docker run -p 6060:60 itetechmadacr.azurecr.io/nux-api`
Open `http://localhost:6060/api/buzzwords`
Push `$docker push itetechmadacr.azurecr.io/nux-api:latest`

Publish first time:    
`kubectl apply -f deployment.yml`
`kubectl apply -f service.yml`
`kubectl apply -f ingress.yml`

Publish latest:
`kubectl delete -f deployment.yml`
`kubectl apply -f deployment.yml`

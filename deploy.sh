set -e
set -x

gcloud config configurations activate default

IMAGE=asia-southeast1-docker.pkg.dev/laundrygo-409619/cloud-functions/chats:production

pnpm build

docker build -t $IMAGE --platform=linux/amd64 .
docker push $IMAGE

gcloud run deploy chats \
    --region=asia-southeast1 \
    --allow-unauthenticated \
    --image $IMAGE \
    --platform managed \
    --min-instances 0 \
    --max-instances 1 \
    --port 8080 \
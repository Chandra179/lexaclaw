```bash
curl -X 'POST' \
  'http://localhost:8080/extract/stream' \
  -H 'accept: text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://www.youtube.com/watch?v=het9HFqo1TQ", "num_ctx": 4096, "styles": ["takeaways"]  
}'

curl -X 'POST' \
  'http://localhost:8080/extract/stream' \
  -H 'accept: text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://www.youtube.com/watch?v=het9HFqo1TQ", "num_ctx": 8192, "styles": ["takeaways"]  
}'


curl -X 'POST' \
  'http://localhost:8080/extract/stream' \
  -H 'accept: text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://www.youtube.com/watch?v=het9HFqo1TQ", "num_ctx": 8192, "styles": ["summary"]  
}'


curl -X 'POST' \
  'http://localhost:8080/extract/stream' \
  -H 'accept: text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://www.youtube.com/watch?v=het9HFqo1TQ", "num_ctx": 8192, "styles": ["summary","takeaways"]  
}'
```
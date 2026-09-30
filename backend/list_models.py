import urllib.request
import json
req = urllib.request.Request("https://openrouter.ai/api/v1/models")
response = urllib.request.urlopen(req)
models = json.loads(response.read().decode())['data']
free_models = [m['id'] for m in models if 'free' in m['id']]
print("Free models:", free_models)

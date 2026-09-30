import urllib.request
import json
import uuid

boundary = uuid.uuid4().hex
headers = {'Content-Type': f'multipart/form-data; boundary={boundary}'}

def get_file_bytes(filename):
    with open(filename, 'rb') as f:
        return f.read()

data = []
data.append(f'--{boundary}\r\nContent-Disposition: form-data; name="resume"; filename="resume.pdf"\r\nContent-Type: application/pdf\r\n\r\n'.encode('utf-8'))
data.append(get_file_bytes('dummy_resume.pdf'))
data.append(f'\r\n--{boundary}\r\nContent-Disposition: form-data; name="jd"; filename="jd.pdf"\r\nContent-Type: application/pdf\r\n\r\n'.encode('utf-8'))
data.append(get_file_bytes('dummy_jd.pdf'))
data.append(f'\r\n--{boundary}--\r\n'.encode('utf-8'))

body = b''.join(data)

req = urllib.request.Request("http://localhost:8002/api/analyze", data=body, headers=headers)
try:
    response = urllib.request.urlopen(req)
    print(response.read().decode())
except Exception as e:
    print(e)
    if hasattr(e, 'read'):
        print(e.read().decode())

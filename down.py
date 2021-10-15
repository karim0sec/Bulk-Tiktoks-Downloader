import requests 
file_url_1 = "https://tikcdn.net/file/1NzAxNDU1MTAxNjQxODg4ODk2Nl92MDkwNDRnNDAwMDBjNWNiMWhqYzc3dWVzdHRhMG52Z19hdXJlbGlh2.mp4"
file_url_2 = "https://tikcdn.net/file/1NzAxNTU1MjIwNTA2NzY1MjM1OF92MDkwNDRnNDAwMDBjNWUzdjNqYzc3dWEzN3Nzc3BpMF9jaGFybGktd3Jlbi10b2tz2.mp4"
file_url_3 = "https://tikcdn.net/file/1NzAxNzE0ODc5MTMyOTM5MzkyNV92MDkwNDRnNDAwMDBjNWd1a3BiYzc3dTQ5OWhmcTc4MF9hdXJlbGlh2.mp4"
file_url_4 = "https://tikcdn.net/file/1NzAxMjE2NDM2MDczOTAxNTk0MV92MDkwNDRnNDAwMDBjNTgzY2wzYzc3dWJjcTZpamRvZ19uYWRpbmEtaW9hbmE%3D2.mp4"
file_url_5 = "https://tikcdn.net/file/1NzAxNzA3Njg4NDI1NzE0ODE2Nl92MDkwNDRnNDAwMDBjNWdxaWlqYzc3dWFpODJnMXJkMF9sdW5hLWJsb29tLWFzbXI%3D2.mp4"
file_url_6 = "https://tikcdn.net/file/1NzAxMzMyNjk1MTk3Njg4MTQxNF92MDkwNDRnNDAwMDBjNWE1ZHYzYzc3dTZzc2NtZnVjMF9zYXNoYS1yb2RyaWd1ZXo%3D2.mp4"
file_url_7 = "https://tikcdn.net/file/1NzAxNzM5Njk3NjQzNDEzODM3NF92MDkwNDRnNDAwMDBjNWhjcTIzYzc3dWNrcGtucTVwMF9taXNrb2FzbXI%3D2.mp4"
file_url_8 = "https://tikcdn.net/file/1NzAxNTk4NzA5Nzc5ODQ0NjM0Ml92MDkwNDRnNDAwMDBjNWVzaTEzYzc3dWVzdHZ1ZnMyMF9tYXJpYW0tc2xpbWU%3D2.mp4"
file_url_9 = "https://tikcdn.net/file/1NzAxNDc2MzU0Njg5MDIxMDU2NV92MDkwNDRnNDAwMDBjNWNuNDliYzc3dWNtdDI4NjBzMF9hbm5h2.mp4"
file_url_10 = "https://tikcdn.net/file/1NzAxNTY2NDA3MDQ3Mjg3OTM2Nl92MDkwNDRnNDAwMDBjNWVhYWViYzc3dWJhaGVwYjF0Z19hdXJlbGlh2.mp4"
file_url_11 = "https://tikcdn.net/file/1NzAxNjYyOTE4NjA2NDQyMDEwMV92MDkwMjVnNDAwMDBjNWcxNXFqYzc3dThkMWpxYTVpZ19rYW5neWEwMw%3D%3D2.mp4"
file_url_12 = "https://tikcdn.net/file/1NzAwOTY2MTM2NTc5MTAzNDYyOV92MDkwNDRnNDAwMDBjNTNrc3JiYzc3dTBxMzVncDYzZ19zYXNzeS1pbi0ybmQ%3D2.mp4"
#we copy links from text and post here while edit numbers from 1 to 12 to download them all
a = requests.get(file_url_1, stream = True) 

with open("video1.mp4", "wb") as file: 
	for block in a.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

b = requests.get(file_url_2, stream = True) 

with open("video2.mp4", "wb") as file: 
	for block in b.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

c = requests.get(file_url_3, stream = True) 

with open("video3.mp4", "wb") as file: 
	for block in c.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

d = requests.get(file_url_4, stream = True) 

with open("video4.mp4", "wb") as file: 
	for block in d.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

e = requests.get(file_url_5, stream = True) 

with open("video5.mp4", "wb") as file: 
	for block in e.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

f = requests.get(file_url_6, stream = True) 

with open("video6.mp4", "wb") as file: 
	for block in f.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

g = requests.get(file_url_7, stream = True) 

with open("video7.mp4", "wb") as file: 
	for block in g.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

h = requests.get(file_url_8, stream = True) 

with open("video8.mp4", "wb") as file: 
	for block in h.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

i = requests.get(file_url_9, stream = True) 

with open("video9.mp4", "wb") as file: 
	for block in i.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

l = requests.get(file_url_10, stream = True) 

with open("video10.mp4", "wb") as file: 
	for block in l.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

m = requests.get(file_url_11, stream = True) 

with open("video11.mp4", "wb") as file: 
	for block in m.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 

n = requests.get(file_url_12, stream = True) 

with open("video12.mp4", "wb") as file: 
	for block in n.iter_content(chunk_size = 1024): 
		if block: 
			file.write(block) 


import requests
from bs4 import BeautifulSoup
url="https://cryptocurrencyjobs.co/web3/"
r=requests.get(url)
htmlCon=r.content
soup=BeautifulSoup(htmlCon,'html.parser')
main=soup.find("ol",{'class':"ais-Hits-list"})
print(main)
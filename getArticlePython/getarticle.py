import requests
from bs4 import BeautifulSoup
import json

# URL of the Qiita Advent Calendar page for Houdini
url = 'https://qiita.com/advent-calendar/2022/houdini'

def get_article_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Finding all elements that contain the article data
    entries = soup.find_all('a', href=True)
    articles = []
    for entry in entries:
        if 'advent-calendar' in entry['href']:
            continue  # Skipping links that are not articles
        title = entry.text.strip()
        if title.startswith('@'):
            author = title
            title = None
        else:
            author = None

        link = entry['href']
        # Extracting the date from the link
        date = link.split('/')[-2]
        if title and link:
            articles.append({'date': date, 'author': author,'title': title, 'link': link})

    return articles

def main():
    articles = get_article_data(url)
    with open('output.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()

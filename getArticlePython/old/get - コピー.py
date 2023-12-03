import requests
from bs4 import BeautifulSoup
import json

# URL of the Qiita Advent Calendar page for Houdini
url = 'https://qiita.com/advent-calendar/2022/houdini'

def get_advent_calendar_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extracting data from the advent calendar
    calendar_data = []
    for td in soup.find_all('td'):
        
        entries = td.find_all('a', href=True)
        articles = []
        for entry in entries:
            title = entry.text.strip()
            print(title)
            if title.startswith('@'):
                author = title
                title = None
            else:
                author = None

        """
        elements = td.find_all('p')
        if not elements:
            continue
        print(elements)

        date = elements[0].get_text(strip=True) if len(elements) > 0 else None
        twitter_account = elements[1].get_text(strip=True) if len(elements) > 1 else None
        title = elements[2].get_text(strip=True) if len(elements) > 2 else None

        calendar_data.append({
            'date': date,
            'twitter_account': twitter_account,
            'title': title
        })
        """

    return calendar_data

def main():
    data = get_advent_calendar_data(url)
    #with open('output.json', 'w', encoding='utf-8') as f:
    #    json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    main()

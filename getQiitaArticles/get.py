import requests
from bs4 import BeautifulSoup
import json
import os

skipindex2016_1 = [] #Houdini Advent Calendar 2016
skipindex2017_1 = [] #Houdini Advent Calendar 2017
skipindex2018_1 = [] #Houdini Advent Calendar 2018
skipindex2019_1 = [] #Houdini Advent Calendar 2019
skipindex2020_1 = [] #Houdini Advent Calendar 2020
skipindex2021_1 = [] #Houdini Advent Calendar 2021
skipindex2022_1 = [] #Houdini Advent Calendar 2022
skipindex2023_1 = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] #Houdini Advent Calendar 2023
skipindex2024_1 = [] #Houdini Advent Calendar 2024
skipindex2025_1 = [] #Houdini Advent Calendar 2025
skipindex2025_3 = [2,3,5,6,7,10,11,12,13,14,16,17,18,19,21,22,23,24,25] #Houdini Advent Calendar 2025 シリーズ2

skipindex2018_2 = [1,8,13,17,19,20,23] #Houdini Apprentice Advent Calendar 2018
skipindex2019_2 = [23] #Houdini Apprentice Advent Calendar 2019
skipindex2020_2 = [7] #Houdini Apprentice Advent Calendar 2020
skipindex2021_2 = [] #Houdini Apprentice Advent Calendar 2021
skipindex2022_2 = [] #Houdini Apprentice Advent Calendar 2022
skipindex2023_2 = [] #Houdini Apprentice Advent Calendar 2023
skipindex2024_2 = [] #Houdini Apprentice Advent Calendar 2024
skipindex2025_2 = [] #Houdini Apprentice Advent Calendar 2025
skipindex2025_4 = [2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,22,24] #Houdini Advent Calendar 2025 シリーズ2


noskipindex = [] #Houdini Apprentice Advent Calendar 2023

monthAr = [i for i in range(1, 26)]

##### set yourself #####
setyear = 2025
setmonth = 12
setcalendarIndexNo = 3 # (1:Houdini Advent Calendar 2:Houdini Apprentice Advent Calendar 3:Houdini Advent Calendar Part2 4:Houdini Apprentice Advent Calendar Part2)
##### set yourself #####

# setcalendarIndexNoからsetseriesNoを自動決定
setseriesNo = 1 # (1:シリーズ1 2:シリーズ2) - setcalendarIndexNoが3または4の場合は自動的に2に設定されます
# 1,2 → シリーズ1 / 3,4 → シリーズ2
if setcalendarIndexNo in [3, 4]:
    setseriesNo = 2
elif setcalendarIndexNo in [1, 2]:
    setseriesNo = 1

# skipindexを自動生成
# skipindex{year}_{setcalendarIndexNo} の形式で変数名を生成
# 例: skipindex2025_1, skipindex2025_2, skipindex2025_3, skipindex2025_4
skipindex_var_name = f'skipindex{setyear}_{setcalendarIndexNo}'

skipindex = globals().get(skipindex_var_name, [])
if skipindex == [] and skipindex_var_name not in globals():
    print(f'Warning: {skipindex_var_name} is not defined. Using empty list [] as default.')

# articleId計算用のカレンダーインデックス
# setcalendarIndexNoをそのまま使用（1→1, 2→2, 3→3, 4→4）
actualCalendarIndexNo = setcalendarIndexNo

# skip date
activeindex = [x for x in monthAr if x not in skipindex]

print("activeindex")
print(activeindex)

# URL of the Qiita Advent Calendar page for Houdini
if setcalendarIndexNo==1 or setcalendarIndexNo==3:
    url = 'https://qiita.com/advent-calendar/' + str(setyear) + '/houdini'
else:
    url = 'https://qiita.com/advent-calendar/' + str(setyear) + '/happrentice'

# make subfolder
folder_name = 'icon'
if not os.path.exists(folder_name):
    os.makedirs(folder_name)

folder_name2 = 'thumbnail'
if not os.path.exists(folder_name2):
    os.makedirs(folder_name2)

def get_advent_calendar_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    calendar_data = []
    title_data = []
    url_data = []
    twitter_data = []

    countindex=0

    # シリーズ番号に応じて特定のテーブル内のtd要素だけを取得
    series_selector_id = f'seriesSelectorControl{setseriesNo}'
    series_container = soup.find('div', id=series_selector_id)
    
    if series_container is None:
        print(f'Warning: {series_selector_id} not found. Processing all td elements.')
        td_elements = soup.find_all('td')
    else:
        # シリーズコンテナ内のテーブルからtd要素を取得
        td_elements = series_container.find_all('td')

    for td in td_elements:
        
        entries = td.find_all('a', href=True)
        
        # reset variables
        articles = {}
        author = ''
        title = ''
        link = ''
        articleIdimg = ''
        entrycount = 0

        for entry in entries:
            
            entrydata = entry.text.strip()

            if 'the terms of use' == entrydata:
                continue  # Skipping

            if countindex >= len(activeindex):
                #print("skip over:"+str(len(activeindex)))
                continue  # Skipping

            print('--------------------------------'+str(setmonth)+'/'+str(activeindex[countindex]))
            print(entrydata)

            #print(title)
            # Qiita Author name  prefix @
            if entrydata.startswith('@'):
                author = entrydata
                authorlink = entry['href']

                if authorlink.startswith('/'):
                    authorname = authorlink[1:]

                # img tag check
                img_tag = entry.find('img')

                # 20xx / 12 / xx -01 (actualCalendarIndexNo 1:Houdini Advent Calendar 2:Houdini Apprentice Advent Calendar 3:Houdini Advent Calendar Part2 4:Houdini Apprentice Advent Calendar Part2)
                # sample: 2019120101, 2019120102, 2019120103, 2019120104
                articleId = setyear *1000000 + setmonth *10000 + activeindex[countindex]*100 + actualCalendarIndexNo
                articleIdimg = str(articleId)+'.jpg'



                if img_tag and 'src' in img_tag.attrs:
                    img_url = img_tag['src']
                    img_save_name = str(authorname) + '.jpg'

                    # author Icon jpg download
                    img_data = requests.get(img_url).content
                    img_name = os.path.basename(img_save_name)
                    img_path = os.path.join(folder_name, img_name)
                    with open(img_path, 'wb') as file:
                        file.write(img_data)
                    img_name2 = os.path.basename(articleIdimg)
                    img_path2 = os.path.join(folder_name2, img_name2)
                    with open(img_path2, 'wb') as file:
                        file.write(img_data)

            else:
                title = entrydata
                link = entry['href']
            
            if title and link and activeindex[countindex]:
                creationDate = str(setyear)+'-'+str(setmonth)+'-'+str(activeindex[countindex]).zfill(2)
                articles=({ 'thumbnailUrl':articleIdimg,'creationDate': creationDate,'author': {'name': author,'icon':img_save_name,'qiitaUrl':('https://qiita.com/'+authorname),'twitterUrl':('https://twitter.com/'+authorname)},'title': {'ja':title,'en':title}, 'articleUrl': link, 'categories': 'Houdini','tags': 'SOP Python','articleId': articleId ,'summary':  {'ja':'ダミー','en':'Dummy'} })
                #print(articles)
                calendar_data.append(articles)

                url_data.append(link)
                title_data.append(title)
                twitter_data.append(('https://twitter.com/'+authorname))

                #increment
                countindex = countindex + 1
            else:
                print('skip')

            entrycount = entrycount + 1

    return [calendar_data,url_data,title_data,twitter_data] # 0: calendar_data  ,  1: url_data  ,  2: title_data  ,  3: twitter_data

def main():
    data = get_advent_calendar_data(url)
    
    with open('calendar_data_'+str(setyear)+'_'+str(setcalendarIndexNo)+'.json', 'w', encoding='utf-8') as f:
        json.dump(data[0], f, ensure_ascii=False, indent=4)
    with open('url_data_'+str(setyear)+'_'+str(setcalendarIndexNo)+'.json', 'w', encoding='utf-8') as f:
        json.dump(data[1], f, ensure_ascii=False, indent=4)
    with open('title_data_'+str(setyear)+'_'+str(setcalendarIndexNo)+'.json', 'w', encoding='utf-8') as f:
        json.dump(data[2], f, ensure_ascii=False, indent=4)
    with open('twitter_data_'+str(setyear)+'_'+str(setcalendarIndexNo)+'.json', 'w', encoding='utf-8') as f:
        json.dump(data[3], f, ensure_ascii=False, indent=4)
if __name__ == '__main__':
    main()

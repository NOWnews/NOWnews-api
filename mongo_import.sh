#/bin/bash
DBNAME='NOWnews_Develop'
COLLECTION='news'
ls -1 news_*.json | while read data; do 
    mongoimport -d $DBNAME -c $COLLECTION < $data; 
done
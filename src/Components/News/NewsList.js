import React, {useState, useEffect} from 'react'
import axios from 'axios'
import NewsItem from './NewsItem'

function NewsList({fos}) {
  const [articles, setArticles] = useState([])
  const URL = `https://newsapi.org/v2/everything?q=${fos}&apiKey=8f11e2f197cb46e4a000399815778078`

  useEffect(() => {
    const getArticles = async () => {
        const response = await axios.get(URL)
        setArticles(response.data.articles)
    } 
    getArticles()
  }, [fos])
  return (
    <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {articles.map((article, index) => (
            <NewsItem key={index}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                source={article.source.name}
                date={article.publishedAt}  
            />
        ))}
    </div>
  )
}

export default NewsList
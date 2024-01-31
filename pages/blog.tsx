import type { GetServerSideProps, NextPageWithLayout } from "./_app";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import blogImg from "../public/template/img/artikel/berita1.jpg";

const Blog: NextPageWithLayout = ({ newsData }) => {
  return (
    <section id="blog" className={styles.blog}>
      <h2><span>Bl</span>og</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, aspernatur
        accusantium. Quidem ab aliquid corporis.
      </p>

      <div className='row'>
        {newsData.map((article, index) => (
          <div key={index} className='col-md-4 mb-4'>
            <div className="card bg-dark text-white">
              <div className='row g-0'>
                <div className='col-md-4'>
                  <Image
                    src={article?.urlToImage || blogImg}
                    alt={article?.title}
                    className='img-fluid rounded-start'
                    width={650}
                    height={650}
                    priority={false}
                    loading='lazy'
                  // fill={true}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{article?.title}</h5>
                    <p className='card-text'>Author : {article?.author}</p>
                    <span className='card-text'>{article?.description}</span>
                    <br />
                    <a
                      href={article?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-secondary mt-3"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section >
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apiKey = process.env.NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.articles) {
      return {
        props: {
          newsData: data.articles,
        },
      };
    } else {
      console.error('Failed to fetch news data:', data);
      return {
        props: {
          newsData: [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
    return {
      props: {
        newsData: [],
      },
    };
  }
};

export default Blog;

Blog.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};